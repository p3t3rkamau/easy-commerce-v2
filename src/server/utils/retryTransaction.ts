// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const retryTransaction = async (
  transactionFunction: () => Promise<void>,
  maxRetries = 5,
) => {
  let retryCount = 0
  while (retryCount < maxRetries) {
    try {
      await transactionFunction()
      break // Transaction succeeded, exit loop
    } catch (error: unknown) {
      if (error && error.code === 112) {
        // WriteConflict error code
        retryCount++
        console.log(`Retrying transaction (attempt ${retryCount}/${maxRetries})...`)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000)) // Exponential backoff
      } else {
        throw error // Re-throw other errors
      }
    }
  }
  if (retryCount === maxRetries) {
    throw new Error(`Transaction failed after ${maxRetries} attempts.`)
  }
}
