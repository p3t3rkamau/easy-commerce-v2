// hooks/sendOrderEmails.js
import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { generateEmailContent } from '../../../utilities/generateEmailContent'
import { sendEmail } from '../../../utilities/sendemail'

export const sendOrderEmails: AfterChangeHook = async ({ doc, req, operation }) => {
  console.log('sendOrderEmails hook triggered') // Log when hook is triggered

  if (operation === 'create') {
    console.log('Creating order email content') // Log before generating email content

    const { userEmailContent, companyEmailContent } = generateEmailContent(doc)

    // Assuming `orderedBy` contains the user's email
    const userEmail = typeof doc.orderedBy === 'object' ? doc.orderedBy.email : null
    const companyEmail = 'petercubolt@gmail.com' // Replace with your company's email address

    if (!userEmail) {
      console.error('User email is missing') // Log error if user email is missing
      return
    }

    console.log(`Sending email to user: ${userEmail}`) // Log the user email
    console.log(`Sending email to company: ${companyEmail}`) // Log the company email

    try {
      // Send email to user
      await sendEmail({
        to: userEmail,
        subject: 'Your Order Confirmation',
        html: userEmailContent,
      })
      console.log('User email sent successfully') // Log success

      // Send email to company
      await sendEmail({
        to: companyEmail,
        subject: 'New Order Received',
        html: companyEmailContent,
      })
      console.log('Company email sent successfully') // Log success
    } catch (error: unknown) {
      console.error('Error sending order emails:', error) // Log error
    }
  }
}
