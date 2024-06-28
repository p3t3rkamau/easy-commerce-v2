import { getAccessToken } from './AccessToken' // Update the path accordingly

interface CurlResponse {
  CheckoutRequestID: string
  ResponseCode: string
}

interface DepositFormData {
  amount: number
  accountNumber: string
  phone: string
}

export const deposit = async (formData: DepositFormData): Promise<void> => {
  try {
    // Include accessToken retrieval logic
    const accessToken = await getAccessToken()

    // Destructure form data
    const { amount, accountNumber, phone } = formData

    // Check first 3 digits of phone number
    const first3digits = phone.slice(0, 3) === '254' ? phone : `254${phone}`

    // Set up other variables
    const processrequestUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    const callbackurl = '' // Fill with your callback URL
    const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    const BusinessShortCode = '174379'
    const Timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, -3)
    const Password = btoa(BusinessShortCode + passkey + Timestamp)
    const money = amount.toString()
    const PartyA = first3digits
    const PartyB = '254708374149' // Your business number
    const AccountReference = accountNumber
    const TransactionDesc = 'Easy Bake Supplies'
    const Amount = money
    const stkpushheader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }

    // Initiate CURL
    const curl_post_data = {
      BusinessShortCode,
      Password,
      Timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount,
      PartyA,
      PartyB,
      PhoneNumber: PartyA,
      CallBackURL: callbackurl,
      AccountReference,
      TransactionDesc,
    }

    const response = await fetch(processrequestUrl, {
      method: 'POST',
      headers: stkpushheader,
      body: JSON.stringify(curl_post_data),
    })

    const data: CurlResponse = await response.json()
    const { CheckoutRequestID, ResponseCode } = data

    if (ResponseCode === '0') {
      console.log('Payment request successful! CheckoutRequestID:', CheckoutRequestID)
      // You can show a success message to the user here
    } else {
      console.error('Payment request failed. ResponseCode:', ResponseCode)
      // You can show an error message to the user here
    }
  } catch (error: unknown) {
    console.error('Error:', error)
    // Handle error
  }
}
