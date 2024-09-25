// hooks/removeExpiredFlashSales.ts
import payload from 'payload'
import type { AfterChangeHook } from 'payload/dist/collections/config/types'

export const removeExpiredFlashSales: AfterChangeHook = async ({ doc }) => {
  const currentTime = new Date().toISOString()

  const updatedLayout = await Promise.all(
    doc.layout.map(async block => {
      if (
        block.blockType === 'flash-sales' &&
        block.EndTime &&
        new Date(block.EndTime) < new Date(currentTime)
      ) {
        // Remove expired flash sale
        return null
      }

      // Remove out-of-stock items
      if (block.blockType === 'flash-sales') {
        block.selectedDocs = await Promise.all(
          block.selectedDocs.filter(async productId => {
            const product = await payload.findByID({ collection: 'products', id: productId })
            return product?.stock > 0 // Assuming `stock` is the field for available stock
          }),
        )
      }

      return block
    }),
  )

  return {
    ...doc,
    layout: updatedLayout.filter(Boolean),
  }
}
