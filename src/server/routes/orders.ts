import express from 'express'

import { cancelOrder } from '../services/processes/cancelOrder'

const router = express.Router()

router.post('/orders/:id/cancel', async (req, res) => {
  const { id } = req.params

  try {
    const result = await cancelOrder(id)
    res.json(result)
  } catch (error: unknown) {
    console.error('Error canceling order:', error)
    res.status(500).json({ error: 'Failed to cancel order' })
  }
})

export default router
