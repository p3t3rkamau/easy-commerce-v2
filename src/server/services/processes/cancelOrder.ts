import payload from 'payload'

export const cancelOrder = async (id: string): Promise<unknown> => {
  try {
    const existingOrder = await payload.findByID({
      collection: 'orders',
      id,
    })

    if (!existingOrder) {
      throw new Error('Order not found')
    }

    const result = await payload.update({
      collection: 'orders',
      id,
      data: {
        canceled: true,
      },
    })

    return result
  } catch (error: unknown) {
    console.error('Error canceling order:', error)
    throw error
  }
}
