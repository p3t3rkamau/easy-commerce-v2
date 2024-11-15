import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import next from 'next'
import nextBuild from 'next/dist/build'
import NodeCache from 'node-cache'
import nodemailer from 'nodemailer'
import path from 'path'
import payload from 'payload'

import generateSitemap from '../genarateSitemap'
import { sendEmail } from './payload/utilities/sendemail'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const cache = new NodeCache()
const PORT = process.env.PORT || 3002
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
  // from: 'Easy Bake Supplies Limited <noreply@berleensafaris.com>',
})

app.post('/api/feedbackform', async (req, res) => {
  const feedbackResponses = req.body

  try {
    await retryTransaction(async () => {
      await Promise.all(
        feedbackResponses.map(async response => {
          const existingResponse = await payload.find({
            collection: 'feedbackform',
            where: {
              questionId: response.questionId,
              response: response.response,
            },
          })

          if (existingResponse.totalDocs > 0) {
            const existingDoc = existingResponse.docs[0]
            await payload.update({
              collection: 'feedbackform',
              id: existingDoc.id,
              data: {
                count: existingDoc.count + 1,
              },
            })
          } else {
            await payload.create({
              collection: 'feedbackform',
              data: {
                ...response,
                count: 1,
              },
            })
          }
        }),
      )
    })

    res.status(200).send({ message: 'Feedback submitted successfully!' })
  } catch (error: unknown) {
    console.error('Error submitting feedback:', error)
    res.status(500).send({ error: 'Failed to submit feedback.' })
  }
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function retryTransaction(transactionFunction: () => Promise<void>, maxRetries = 3) {
  let retryCount = 0
  while (retryCount < maxRetries) {
    try {
      await transactionFunction()
      break // Transaction succeeded, exit loop
    } catch (error: unknown) {
      // @ts-expect-error
      if (error && error.code === 112) {
        // WriteConflict error code
        retryCount++
        console.log(`Retrying transaction (attempt ${retryCount}/${maxRetries})...`)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000)) // Exponential backoff
      } else {
        throw error // Re-throw other errors
      }
    }
  }
  if (retryCount === maxRetries) {
    throw new Error(`Transaction failed after ${maxRetries} attempts.`)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const saveSearchTerm = async (term: string) => {
  try {
    const existingTerm = await payload.find({
      collection: 'searchTerms',
      where: {
        term: {
          equals: term,
        },
      },
    })
    if (existingTerm.totalDocs > 0) {
      await payload.update({
        collection: 'searchTerms',
        id: existingTerm.docs[0].id,
        data: {
          count: existingTerm.docs[0].count + 1,
          // @ts-expect-error
          lastSearched: new Date(),
        },
      })
    } else {
      await payload.create({
        collection: 'searchTerms',
        data: {
          term,
          count: 1,
          // @ts-expect-error
          lastSearched: new Date(),
        },
      })
    }
  } catch (error: unknown) {
    console.error('Error saving search term:', error)
  }
}

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '8feae4b0-081c-4408-967e-01e3cdc38d98',
    express: app,
    email: {
      transport: transporter,
      fromName: 'Easy Bake Supplies Limited',
      fromAddress: 'noreply@berleensafaris.com',
    },
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // if (process.env.PAYLOAD_SEED === 'true') {
  //   await seed(payload)
  //   process.exit()
  // }
  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })
  const nextHandler = nextApp.getRequestHandler()
  app.get('/test', (req, res) => {
    res.send('All Systems Operational')
  })

  app.get('/robots.txt', (req, res) => {
    const robotsTxt = `
      User-agent: *
      Disallow: /admin/
      
      Sitemap: ${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap.xml
    `
    res.setHeader('Content-Type', 'text/plain')
    res.send(robotsTxt)
  })
  app.post('/api/validate-coupon', async (req, res) => {
    const { code } = req.body

    try {
      // Fetch coupon details from Payload CMS or your coupon database
      const coupon = await payload.find({
        collection: 'coupons', // Replace with your Payload CMS collection name for coupons
        where: {
          code: {
            equals: code,
          },
        },
      })

      // Handle coupon not found
      if (coupon.totalDocs === 0) {
        return res.status(404).json({ message: 'Coupon not found' })
      }

      // Extract coupon details
      const { type, value, applicableTo, expiryDate } = coupon.docs[0]

      // Check if coupon is expired
      if (expiryDate && new Date(expiryDate) < new Date()) {
        return res.status(400).json({ message: 'Coupon has expired' })
      }

      // Respond with coupon details
      res.status(200).json({
        type,
        value,
        applicableTo,
      })
    } catch (error: unknown) {
      console.error('Error validating coupon:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })

  app.use((req, res) => nextHandler(req, res))

  app.get('/sitemap.xml', async (req, res) => {
    try {
      const sitemap = await generateSitemap() // Generate the sitemap
      res.setHeader('Content-Type', 'application/xml')
      res.send(sitemap) // Use send instead of write/end for simplicity
    } catch (error: unknown) {
      console.error('Error generating sitemap:', error)
      res.status(500).send('Internal Server Error')
    }
  })
  app.post('/api/users/reset-password', async (req, res) => {
    try {
      const { token, password } = req.body

      // Reset the user's password using Payload CMS
      const result = await payload.resetPassword({
        collection: 'users',
        // @ts-expect-error
        token,
        password,
      })

      res.json(result)
    } catch (error: unknown) {
      res.status(500).json({ error: error })
    }
  })
  app.get('/api/flash-sales', async (req, res) => {
    try {
      const currentTime = new Date().toISOString()

      // Fetch active flash sales
      const flashSales = await payload.find({
        collection: 'flashSales',
        where: {
          EndTime: {
            greater_than: currentTime, // Only fetch flash sales that haven't ended
          },
        },
      })

      if (flashSales.docs.length === 0) {
        return res.status(404).json({ message: 'No active flash sales' })
      }

      // Fetch products that are part of these flash sales
      const flashSaleProductIds = flashSales.docs.flatMap(flashSale => flashSale.selectedDocs)

      const productsInFlashSale = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: flashSaleProductIds, // Fetch products in active flash sales
          },
        },
      })

      res.status(200).json(productsInFlashSale.docs)
    } catch (error: unknown) {
      console.error('Error fetching flash sales:', error)
      res.status(500).json({ error: 'Failed to fetch flash sales' })
    }
  })

  app.post('/api/orders/:id/cancel', async (req, res) => {
    const { id } = req.params

    try {
      // Fetch the existing order to ensure it exists
      const existingOrder = await payload.findByID({
        collection: 'orders',
        id,
      })

      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' })
      }

      // Update the order to set 'canceled' to true
      const result = await payload.update({
        collection: 'orders',
        id,
        data: {
          canceled: true,
        },
      })

      res.json(result)
    } catch (error: unknown) {
      console.error('Error canceling order:', error) // Log the error for debugging
      res.status(500).json({ error: 'Failed to cancel order' })
    }
  })

  // Forgot Password Route
  app.post('/api/users/forgot-password', async (req, res) => {
    try {
      const { email } = req.body

      // Generate a reset password token using Payload CMS
      await payload.forgotPassword({
        collection: 'users',
        data: { email },
      })

      // Construct the password reset email
      const resetLink = `http://localhost:3001/reset-password?email=${email}`
      const subject = 'Reset Your Password'
      const html = `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`

      // Send the email using the custom sendEmail function
      await sendEmail({
        to: email,
        subject,
        html,
      })

      res.json({ message: 'Password reset email sent successfully' })
    } catch (error: unknown) {
      res.status(500).json({ error: error })
    }
  })
  await nextApp.prepare()

  app.listen(PORT, async () => {
    payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const searchMongoDB = async searchQuery => {
  try {
    const requestBody = {
      collection: 'products',
      database: 'test',
      dataSource: 'Cluster0',
      filter: { title: { $regex: searchQuery, $options: 'i' } },
      projection: {
        title: 1,
        slug: 1,
        price: 1,
        meta: 1,
      },
    }

    const response = await axios.post(process.env.API_LINK, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.API_KEY,
      },
    })

    const searchResults = response.data.documents || []
    return searchResults
  } catch (error: unknown) {
    console.error('Error searching products:', error)
    throw error
  }
}

app.post('/api/search', async (req, res) => {
  const { query } = req.body

  try {
    const cachedResults = cache.get(query)
    if (cachedResults) {
      await saveSearchTerm(query)
      return res.json({ success: true, results: cachedResults })
    }

    const results = await searchMongoDB(query)
    cache.set(query, results, 3600) // Cache for 1 hour
    await saveSearchTerm(query)
    return res.json({ success: true, results })
  } catch (error: unknown) {
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: error })
    } else {
      console.error('Headers already sent, cannot respond with error:', error)
    }
  }
})

app.post('/api/save-search', async (req, res) => {
  const { term } = req.body

  try {
    await saveSearchTerm(term)
    res.status(200).json({ message: 'Search term saved successfully' })
  } catch (error: unknown) {
    console.error('Error saving search term:', error)
    res.status(500).json({ message: 'Error saving search term' })
  }
})

start()
