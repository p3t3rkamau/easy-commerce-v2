import fetch from 'node-fetch'

export const initiateMpesaPayment = async ({ req, data }) => {
  const { phone, total } = data
  const serverUrl = process.env.SERVER_URL // Your server-side component URL

  try {
    const response = await fetch(`${serverUrl}/initiate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, amount: total }),
    })

    const { status, message } = await response.json()

    if (status === 'Success') {
      // Payment initiated successfully
      // Update the order status and relevant data in Payload CMS
      // ...
    } else {
      // Handle payment initiation error
      // ...
    }
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error)
    // Handle error
    // ...
  }
}
