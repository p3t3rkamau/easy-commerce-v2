import { adminEmailTemplate, userEmailTemplate } from './Emailtemplates/cancelorder'
import { sendEmailWithRetry } from './sendEmailWithRetry'

// Define return type as Promise<void> for async functions that don't return anything
export const sendOrderCanceledEmails = async (
  user: { name: string; email: string },
  doc: { id: string; createdAt: string; total: number },
): Promise<void> => {
  try {
    // User Cancellation Email HTML
    const userEmailHtml = userEmailTemplate(user.name, doc.id)

    // Admin Cancellation Email HTML
    const adminEmailHtml = adminEmailTemplate(
      user.name,
      doc.id,
      new Date(doc.createdAt).toLocaleString(),
      doc.total,
    )

    // Send email to the user with retry
    await sendEmailWithRetry({
      to: user.email,
      subject: 'Your Order Has Been Canceled',
      html: userEmailHtml,
      from: 'Easy Bake Supplies Limited',
    })

    // Send email to admin with retry
    await sendEmailWithRetry({
      to: 'petercubolt@gmail.com',
      subject: 'Order Canceled Notification',
      html: adminEmailHtml,
      from: 'Easy Bake Supplies Limited',
    })
  } catch (error: unknown) {
    console.error('Error sending email:', error)
  }
}
