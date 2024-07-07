// utils/sendEmail.js
import { Resend } from 'resend'

const resend = new Resend('re_5GMVdfwo_Q8LT5uyX8MFcdgHXZPJqbkim')

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: 'Easy Bake Supplies Limited',
      to,
      subject,
      html,
    })
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
