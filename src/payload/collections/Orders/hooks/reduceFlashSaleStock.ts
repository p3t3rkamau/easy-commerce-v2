import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { Order, Product } from '../../../payload-types'

export const reduceFlashSaleStock: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req

  if (operation === 'create') {
    const { products } = doc

    for (const product of products) {
      const productDoc = (await payload.findByID({
        collection: 'products',
        id: product.id,
      })) as Product

      if (productDoc.isFlashSale) {
        const newStock = productDoc.stock - product.quantity

        await payload.update({
          collection: 'products',
          id: product.id,
          data: {
            stock: newStock,
          },
        })
      }
    }
  }

  return
}
