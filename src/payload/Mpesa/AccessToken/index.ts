// Define types for request and response

interface AccessTokenResponse {
  access_token: string
  // Add any other fields returned by the API if needed
}

export const getAccessToken = async (): Promise<string> => {
  // const consumerKey = 'KIQPLtAVQwGeqAcpiTffTLSYX0j5VLdUcnmuNuQGJK93CGrb' // Fill with your app Consumer Key
  // const consumerSecret = 'vYRtwK4TZQdkwHkz7ybsl38xBqldNgBpcdQSilQznKnAfc1IwZChNVKxDg86ePXh' // Fill with your app Consumer Secret
  const access_token_url =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
  const headers: HeadersInit = { 'Content-Type': 'application/json; charset=utf8' }

  const response: Response = await fetch(access_token_url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({}),
    credentials: 'include',
    mode: 'cors',
    cache: 'default',
  })

  const result: AccessTokenResponse = await response.json()
  return result.access_token
}
