import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import next from 'next'
import nextBuild from 'next/dist/build'
import nodemailerSendgrid from 'nodemailer-sendgrid'
import path from 'path'
import payload from 'payload'

import generateSitemap from '../genarateSitemap'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const PORT = process.env.PORT || 3002
app.use(cors())

const sendGridAPIKey = process.env.SENDGRID_API_KEY

const sendgridConfig = {
  transportOptions: nodemailerSendgrid({
    apiKey: sendGridAPIKey,
  }),
}

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    email: {
      fromName: 'EasyBake Supplies Limited',
      fromAddress: 'petercubolt@gmail.com',
      ...sendgridConfig,
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
  app.get('/robots.txt', (req, res) => {
    const robotsTxt = `
      User-agent: *
      Disallow: /admin/
      
      Sitemap: ${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap.xml
    `
    res.setHeader('Content-Type', 'text/plain')
    res.send(robotsTxt)
  })

  app.use((req, res) => nextHandler(req, res))

  await nextApp.prepare()

  app.listen(PORT, async () => {
    payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const searchMongoDB = async (searchQuery: string) => {
  try {
    // Define the request body with the specified type
    const requestBody = {
      collection: 'products',
      database: 'test',
      dataSource: 'Cluster0',
      filter: { title: { $regex: searchQuery, $options: 'i' } },
      projection: { title: 1 },
    }

    // Use Axios to send a request to MongoDB
    const response = await axios.post<{
      data: { SearchProducts: { docs: unknown[] } }
    }>(process.env.API_LINK, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.API_KEY,
      },
    })

    const searchResults = response.data || []
    payload.logger.info(`SearchApi connected successfully`)

    // Log the results to the console
    console.log('Search Results:', searchResults)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error searching products:', error.message)
    } else {
      console.error('Unknown error:', 'The error is not an instance of Error')
    }
  }
}

app.post('/api/search', express.json(), async (req, res) => {
  const { query } = req.body

  try {
    const results = await searchMongoDB(query)
    res.json({ success: true, results })
  } catch (error: unknown) {
    res
      .status(500)
      .json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })
  }
})

start()
