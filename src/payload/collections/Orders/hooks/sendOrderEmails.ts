import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { generateEmailContent } from '../../../utilities/generateEmailContent'
import { sendEmailWithRetry } from '../../../utilities/sendEmailWithRetry'

export const sendOrderEmails: AfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create') {
    const userEmail = typeof doc.orderedBy === 'object' ? doc.orderedBy.email : null
    const companyEmail = 'petercubolt@gmail.com'

    if (!userEmail) {
      console.error('User email is missing')
      return
    }

    const { userEmailContent, companyEmailContent } = generateEmailContent(doc)
    console.log(`Sending email to user: ${userEmail}`)
    console.log(`Sending email to company: ${companyEmail}`)

    try {
      // Send email to user with retry logic
      await sendEmailWithRetry({
        to: userEmail,
        from: 'Easy Bake Supplies Limited <noreply@berleensafaris.com>',
        subject: 'Your Order Confirmation',
        html: userEmailContent,
      })
      console.log('User email sent successfully')

      // Send email to company with retry logic
      await sendEmailWithRetry({
        to: companyEmail,
        from: 'Easy Bake Supplies Limited <noreply@berleensafaris.com>',
        subject: 'New Order Received',
        html: companyEmailContent,
      })
      console.log('Company email sent successfully')
    } catch (error: unknown) {
      console.error('Error sending order emails:', error)
      throw error
    }
  }
}
