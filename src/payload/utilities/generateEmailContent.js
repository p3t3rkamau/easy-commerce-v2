// utils/generateEmailContent.js
export const generateEmailContent = order => {
  const userEmailContent = `
      <h1>Thank you for your order</h1>
      <p>Order ID: ${order.id}</p>
      <p>Total: ${order.total}</p>
      <p>Items:</p>
      <ul>
        ${order.items
          .map(
            item => `
          <li>${item.quantity} x ${item.product.name} - $${item.price}</li>
        `,
          )
          .join('')}
      </ul>
    `

  const companyEmailContent = `
      <h1>New Order Received</h1>
      <p>Order ID: ${order.id}</p>
      <p>Total: ${order.total}</p>
      <p>Items:</p>
      <ul>
        ${order.items
          .map(
            item => `
          <li>${item.quantity} x ${item.product.name} - $${item.price}</li>
        `,
          )
          .join('')}
      </ul>
    `

  return { userEmailContent, companyEmailContent }
}
