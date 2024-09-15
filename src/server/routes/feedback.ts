import { Router } from 'express'

import { findOrCreateFeedback } from '../services/processes/findOrCreateFeedback'
import { retryTransaction } from '../utils/retryTransaction'

const router = Router()

router.post('/feedbackform', async (req, res) => {
  const feedbackResponses = req.body
  try {
    await retryTransaction(async () => {
      await findOrCreateFeedback(feedbackResponses)
    })
    res.status(200).send({ message: 'Feedback submitted successfully!' })
  } catch (error: unknown) {
    console.error('Error submitting feedback:', error)
    res.status(500).send({ error: 'Failed to submit feedback.' })
  }
})

export default router
