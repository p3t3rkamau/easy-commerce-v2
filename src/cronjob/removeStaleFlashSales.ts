import cron from 'node-cron'
import payload from 'payload'

// Define the return type as Promise<void>
export const removeExpiredFlashSales = async (): Promise<void> => {
  const currentTime = new Date().toISOString()

  const flashSales = await payload.find({
    collection: 'flashSales',
    where: {
      EndTime: {
        less_than: currentTime,
      },
    },
  })

  for (const flashSale of flashSales.docs) {
    await payload.update({
      collection: 'products',
      id: flashSale.id,
      data: {
        isFlashSale: false,
      },
    })
  }
}

// Schedule the cron job
cron.schedule('0 * * * *', removeExpiredFlashSales)
