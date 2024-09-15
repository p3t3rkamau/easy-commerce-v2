import express from 'express'

import { validateCoupon } from '../services/processes/validateCoupon'

const router = express.Router()

router.post('/validate-coupon', async (req, res) => {
  const { code } = req.body

  try {
    const couponDetails = await validateCoupon(code)
    res.status(200).json(couponDetails)
  } catch (error: unknown) {
    console.error('Error validating coupon:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router
