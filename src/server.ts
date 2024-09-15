import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import next from 'next'
import nextBuild from 'next/dist/build'
import payload from 'payload'

import generateSitemap from '../genarateSitemap'
import { NEXT_BUILD, NEXT_PUBLIC_SERVER_URL, PORT } from './server/config/enviroments'
import couponRoutes from './server/routes/coupon'
import feedbackRoutes from './server/routes/feedback'
import orderRoutes from './server/routes/orders'
import passwordRoutes from './server/routes/password'
import searchRoutes from './server/routes/search'
import { initPayload } from './server/services/payloadService'
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api', feedbackRoutes)
app.use('/api', searchRoutes)
app.use('/api', feedbackRoutes)
app.use('/api', searchRoutes)
app.use('/api', couponRoutes)
app.use('/api', passwordRoutes)
app.use('/api', orderRoutes)

const start = async (): Promise<void> => {
  await initPayload()

  if (NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })
    return
  }

  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
  const nextHandler = nextApp.getRequestHandler()

  app.get('/test', (req, res) => res.send('All Systems Operational'))

  app.get('/robots.txt', (req, res) => {
    const robotsTxt = `
      User-agent: *
      Disallow: /admin/
      
      Sitemap: ${NEXT_PUBLIC_SERVER_URL}/sitemap.xml
    `
    res.setHeader('Content-Type', 'text/plain')
    res.send(robotsTxt)
  })

  app.get('/sitemap.xml', async (req, res) => {
    try {
      const sitemap = await generateSitemap()
      res.setHeader('Content-Type', 'application/xml')
      res.send(sitemap)
    } catch (error: unknown) {
      console.error('Error generating sitemap:', error)
      res.status(500).send('Internal Server Error')
    }
  })

  app.use((req, res) => nextHandler(req, res))
  await nextApp.prepare()

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

start()
