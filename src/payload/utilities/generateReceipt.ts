// utils/generateReceipt.ts
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

interface OrderDetails {
  orderId: string;
  orderedBy: {
    name: string;
    email: string;
  };
  payment: {
    stripePaymentIntentID: string;
    mpesaTransactionRef: string;
    total: number;
  };
  delivery: {
    location: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    colorId: string;
    size: string;
    volumeOrHeight: string;
  }>;
}

export const generateReceipt = async (order: OrderDetails) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const { orderId, orderedBy, payment, delivery, items } = order;

  let yOffset = 750;
  const lineHeight = 20;

  const drawText = (text: string, fontSize: number = 12) => {
    page.drawText(text, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
    yOffset -= lineHeight;
  };

  drawText(`Order Receipt`, 20);
  drawText(`Order ID: ${orderId}`);
  drawText(`Name: ${orderedBy.name}`);
  drawText(`Email: ${orderedBy.email}`);
  drawText(`Stripe Payment Intent ID: ${payment.stripePaymentIntentID}`);
  drawText(`Mpesa Transaction Ref: ${payment.mpesaTransactionRef}`);
  drawText(`Total Amount: $${payment.total.toFixed(2)}`);
  drawText(`Delivery Location: ${delivery.location}`);
  drawText(`Items:`);
  items.forEach(item => {
    drawText(`- ${item.name} x${item.quantity} @ $${item.price.toFixed(2)}`);
    drawText(`  Color ID: ${item.colorId}, Size: ${item.size}, Volume/Height: ${item.volumeOrHeight}`);
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type:
