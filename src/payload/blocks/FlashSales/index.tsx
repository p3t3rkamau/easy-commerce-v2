import type { Block } from 'payload/types'

export const FlashSales: Block = {
  slug: 'flash-sales',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__11__cGdGG8kez.png',
  labels: {
    singular: 'FlashSale',
    plural: 'flashSales',
  },
  fields: [
    {
      type: 'relationship',
      name: 'selectedDocs',
      label: 'Selection',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Select individual products to show in the slider',
      },
    },
  ],
}
// TODO: recommended archive should be pupulated with products or posts that users are clicking on
