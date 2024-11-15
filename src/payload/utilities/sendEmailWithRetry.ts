import { sendEmail } from './sendemail'

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 4000 

export const sendEmailWithRetry = async (
  emailOptions: { to: string; from: string; subject: string; html: string },
  retries: number = MAX_RETRIES,
): Promise<void> => {
  let attempt = 0
  while (attempt < retries) {
    try {
      await sendEmail(emailOptions)
      console.log('Email sent successfully')
      return // Exit the function if the email was sent successfully
    } catch (error: unknown) {
      attempt += 1
      console.error(`Attempt ${attempt} failed: ${error}`)
      if (attempt >= retries) {
        console.error('Max retries reached. Email not sent.')
        throw error // Rethrow the error if max retries are reached
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, attempt - 1))) // Exponential backoff
    }
  }
}
