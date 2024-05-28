export default interface CallbackData {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number
      ResultDesc: string
      CallbackMetadata: {
        Item: Array<{ Value: string }>
      }
    }
  }
}
