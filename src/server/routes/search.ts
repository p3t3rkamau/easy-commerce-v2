import { Router } from 'express'
import NodeCache from 'node-cache'

import { findOrCreateSearchTerm } from '../services/processes/findOrCreateSearchTerm'
import { saveSearchTerm, searchMongoDB } from '../services/searchService'

const router = Router()
const cache = new NodeCache()

router.post('/search', async (req, res) => {
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
router.post('/save-search', async (req, res) => {
  const { term } = req.body

  try {
    await findOrCreateSearchTerm(term)
    res.status(200).json({ message: 'Search term saved successfully' })
  } catch (error: unknown) {
    console.error('Error saving search term:', error)
    res.status(500).json({ message: 'Error saving search term' })
  }
})

export default router
