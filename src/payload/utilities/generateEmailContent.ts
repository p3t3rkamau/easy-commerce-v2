import { ReceiptEmailHtml } from '../../app/_components/emails/ReceiptEmail'

// Function to truncate descriptions to less than 10 words
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const truncateDescription = (description: string, maxWords = 10) => {
  const words = description.split(' ')
  if (words?.length <= maxWords) {
    return description
  }
  return words?.slice(0, maxWords).join(' ') + '...'
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const generateEmailContent = order => {
  const emailProps = {
    email: order.orderedBy.email,
    date: new Date(),
    orderId: order.id,
    productsCart: order.items.map(item => ({
      id: item.product.id,
      product: {
        title: item.product.title,
        description: truncateDescription(item.product.meta.description),
        price: item.price,
        imageUrl: item.product.meta.image.imagekit.url, // Update with your actual image URL field
      },
      quantity: item.quantity,
    })),
    total: order.total,
    refId: order.refId,
    deliveryType: order.deliveryType,
    deliveryCost: order.deliveryCost,
    location: order.location,
    deliveryNote: order.deliveryNote,
    phoneNumber: order.phoneNumber,
    orderNote: order.orderNotes,
  }

  const userEmailContent = ReceiptEmailHtml(emailProps)

  // For the company email, you can modify the content slightly or use the same
  const companyEmailContent = ReceiptEmailHtml(emailProps)

  return { userEmailContent, companyEmailContent }
}
