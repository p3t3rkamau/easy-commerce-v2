import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Resend API key is missing')
}
const resend = new Resend(process.env.RESEND_API_KEY)

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
