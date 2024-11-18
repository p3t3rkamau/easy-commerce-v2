import type { AfterChangeHook, AfterDeleteHook } from 'payload/dist/collections/config/types'

const updateFlashSaleProducts: AfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  try {
    // Only run for 'update' operations
    if (operation !== 'update') return

    // Get the current and previous list of product IDs
    const currentProductIds = doc.selectedDocs || []
    const previousProductIds = previousDoc?.selectedDocs || []

    // Determine products to add or remove from the flash sale
    const productsToAdd = currentProductIds.filter(id => !previousProductIds.includes(id))
    const productsToRemove = previousProductIds.filter(id => !currentProductIds.includes(id))

    // Update products added to the flash sale
    await Promise.all(
      productsToAdd.map(productId =>
        req.payload.update({
          collection: 'products',
          id: productId,
          data: { isFlashSale: true },
        }),
      ),
    )

    // Update products removed from the flash sale
    await Promise.all(
      productsToRemove.map(productId =>
        req.payload.update({
          collection: 'products',
          id: productId,
          data: { isFlashSale: false },
        }),
      ),
    )
  } catch (error) {
    console.error('Error updating flash sale products:', error)
  }
}

const resetFlashSaleProducts: AfterDeleteHook = async ({ doc, req }) => {
  try {
    // Reset the `isFlashSale` flag for all products in the deleted flash sale
    if (doc.selectedDocs) {
      await Promise.all(
        doc.selectedDocs.map(productId =>
          req.payload.update({
            collection: 'products',
            id: productId,
            data: { isFlashSale: false },
          }),
        ),
      )
    }
  } catch (error) {
    console.error('Error resetting flash sale products:', error)
  }
}

export { resetFlashSaleProducts, updateFlashSaleProducts }
