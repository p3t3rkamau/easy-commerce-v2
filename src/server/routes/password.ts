import express from 'express'

import { forgotPassword } from '../services/processes/forgotPassword'
import { resetPassword } from '../services/processes/resetPassword'

const router = express.Router()

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body

  try {
    const result = await resetPassword(token, password)
    res.json(result)
  } catch (error: unknown) {
    console.error('Error resetting password:', error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body

  try {
    const result = await forgotPassword(email)
    res.json(result)
  } catch (error: unknown) {
    console.error('Error handling forgot password:', error)
    res.status(500).json({ error: 'Failed to handle forgot password' })
  }
})

export default router
