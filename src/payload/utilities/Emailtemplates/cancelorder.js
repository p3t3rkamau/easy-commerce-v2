// emailTemplates.js

export const userEmailTemplate = (userName, orderId) => `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
      .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
      .content { margin: 20px 0; }
      .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Canceled</h1>
      </div>
      <div class="content">
        <p>Dear ${userName},</p>
        <p>Your order with ID ${orderId} has been successfully canceled.</p>
        <p>Thank you for shopping with us. If you have any questions, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>Easy Bake Supplies Limited</p>
        <p>Money back guarantee: If you have any issues, please contact us within two weeks for a refund.</p>
      </div>
      <div class="footer">
        <p>Easy Bake Supplies Limited</p>
        <p>&copy; ${new Date().getFullYear()}</p>
      </div>
    </div>
  </body>
  </html>
`

export const adminEmailTemplate = (userName, orderId, orderDate, total) => `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
      .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
      .content { margin: 20px 0; }
      .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Canceled Notification</h1>
      </div>
      <div class="content">
        <p>Dear Admin,</p>
        <p>The order with ID ${orderId} has been canceled by ${userName}.</p>
        <p>Order Details:</p>
        <p>Ordered On: ${orderDate}</p>
        <p>Total: ${total}</p>
        <p>Thank you,</p>
        <p>Easy Bake Supplies Limited</p>
        <p>Money back guarantee: If you have any questions, please contact us within two weeks.</p>
      </div>
      <div class="footer">
        <p>Easy Bake Supplies Limited</p>
        <p>&copy; ${new Date().getFullYear()}</p>
      </div>
    </div>
  </body>
  </html>
`
