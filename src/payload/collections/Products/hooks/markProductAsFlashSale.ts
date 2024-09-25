import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { Product } from '../../../payload-types'

export const markProductAsFlashSale: AfterChangeHook<Product> = async ({
  doc,
  req,
  previousDoc,
}) => {
  const { payload } = req
  const { FlashSalesItems } = doc // Assuming FlashSalesItems is part of product schema
  const isInFlashSale = FlashSalesItems && FlashSalesItems.length > 0

  // If the product is part of a flash sale, mark it accordingly
  if (isInFlashSale && !previousDoc.isFlashSale) {
    await payload.update({
      collection: 'products',
      id: doc.id,
      data: {
        isFlashSale: true, // Mark as flash sale
      },
    })
  } else if (!isInFlashSale && previousDoc.isFlashSale) {
    // Remove flash sale flag if no longer part of any flash sale
    await payload.update({
      collection: 'products',
      id: doc.id,
      data: {
        isFlashSale: false, // Remove flash sale
      },
    })
  }

  return
}
