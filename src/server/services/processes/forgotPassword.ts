import payload from 'payload'

import { sendEmail } from '../../../payload/utilities/sendemail'

export const forgotPassword = async email => {
  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email },
    })

    const resetLink = `http://localhost:3001/reset-password?email=${email}`
    const subject = 'Reset Your Password'
    const html = `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`

    await sendEmail({
      to: email,
      subject,
      html,
    })

    return { message: 'Password reset email sent successfully' }
  } catch (error: unknown) {
    console.error('Error handling forgot password:', error)
    throw error
  }
}
