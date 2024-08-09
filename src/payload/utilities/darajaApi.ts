import axios from 'axios'

const baseURL = 'https://sandbox.safaricom.co.ke' // Use production URL for live environment

const getAccessToken = async (consumerKey: string, consumerSecret: string): Promise<string> => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
  const response = await axios.get(`${baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
  return response.data.access_token
}

const initiateSTKPush = async (
  consumerKey: string,
  consumerSecret: string,
  phoneNumber: string,
  amount: number,
  description: string,
): Promise<any> => {
  const accessToken = await getAccessToken(consumerKey, consumerSecret)
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3)
  const password = Buffer.from(
    `${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`,
  ).toString('base64')

  const response = await axios.post(
    `${baseURL}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.BUSINESS_SHORT_CODE,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.CALLBACK_URL}/api/mpesa-callback`,
      AccountReference: 'Employee Payment',
      TransactionDesc: description,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

export const darajaAPI = {
  initiateSTKPush: (phoneNumber: string, amount: number, description: string) =>
    initiateSTKPush(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.CONSUMER_KEY!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.CONSUMER_SECRET!,
      phoneNumber,
      amount,
      description,
    ),
}
