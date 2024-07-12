export const generateClientWhatsAppMessage = (order: any): string => {
  const orderDetails = order.items
    .map((item: any) => {
      return `
      🍰 ${item.product.title} x${item.quantity}
        💵 Price: ${item.price}
      `
    })
    .join('\n')

  return `
📦 Order Confirmation:
-------------------------
🆔 Order ID: ${order.id}
📅 Date: ${new Date().toLocaleDateString()}
💲 Total: ${new Intl.NumberFormat('KES', { style: 'currency', currency: 'Ksh' }).format(
    order.total,
  )}
📎 Ref ID: ${order.refId}
🚚 Delivery Type: ${order.deliveryType}
🚛 Delivery Cost: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'Ksh' }).format(
    order.deliveryCost,
  )}
📍 Location: ${order.location}
📝 Delivery Note: ${order.deliveryNote || 'None'}
☎️ Phone Number: ${order.phoneNumber}
📝 Order Note: ${order.orderNotes || 'None'}

🛒 Items:
${orderDetails}
  `.trim()
}
