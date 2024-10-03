import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { generateEmailContent } from '../../../utilities/generateEmailContent'


export const sendOrderEmails: AfterChangeHook = async ({ doc, operation, req }) => {
  console.log('sendOrderEmails hook triggered')

  if (operation === 'create') {
    console.log('Creating order email content')

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
      // Send email to user
      await req.payload.sendEmail({
        to: userEmail,
        from: 'Easy Bake Supplies Limited <noreply@berleensafaris.com>', // Ensure correct from field
        subject: 'Your Order Confirmation',
        html: userEmailContent,
      })
      console.log('User email sent successfully')

      // Send email to company
      await req.payload.sendEmail({
        to: companyEmail,
        from: 'Easy Bake Supplies Limited <noreply@berleensafaris.com>', // Ensure correct from field
        subject: 'New Order Received',
        html: companyEmailContent,
      })
      console.log('Company email sent successfully')
    } catch (error: unknown) {
      console.error('Error sending order emails:', error)
      // You might want to throw the error here to ensure Payload knows the hook failed
      throw error
    }
  }
}