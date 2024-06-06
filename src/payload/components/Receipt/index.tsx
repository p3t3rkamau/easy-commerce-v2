import { saveAs } from 'file-saver'
import { PDFDocument, rgb } from 'pdf-lib'

import { Order } from '../../payload-types'

interface OrderDetails {}

export const generateReceipt = async (order: Order) => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 800])

  const {
    orderedBy = {},
    stripePaymentIntentID,
    mpesaTransactionRef,
    total,
    DeliveryLocation = {},
    items = [],
  } = order

  let yOffset = 750
  const lineHeight = 20

  const drawText = (text: string, fontSize: number = 12) => {
    page.drawText(text, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) })
    yOffset -= lineHeight
  }

  const getOrderedByDetails = (orderedBy: any) => {
    if (typeof orderedBy === 'string') {
      return { name: 'Unknown', email: 'Unknown' } // Fallback values for orderedBy as string
    }
    return {
      name: orderedBy.name || 'Unknown',
      email: orderedBy.email || 'Unknown',
    }
  }

  const getDeliveryLocationDetails = (deliveryLocation: any) => {
    if (typeof deliveryLocation === 'string') {
      return { location: deliveryLocation }
    }
    return {
      location: deliveryLocation?.location || 'Unknown',
    }
  }

  const { name, email } = getOrderedByDetails(orderedBy)
  const { location } = getDeliveryLocationDetails(DeliveryLocation)

  drawText('Order Receipt', 20)
  // drawText(`Order ID: ${id}`)
  drawText(`Name: ${name}`)
  drawText(`Email: ${email}`)
  // drawText(`Stripe Payment Intent ID: ${stripePaymentIntentID || 'N/A'}`)
  // drawText(`Mpesa Transaction Ref: ${mpesaTransactionRef || 'N/A'}`)
  drawText(`Total Amount: $${total.toFixed(2)}`)

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  saveAs(blob, `OrderReceipt.pdf`)
}
