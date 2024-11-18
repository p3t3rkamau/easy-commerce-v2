import type { CollectionConfig } from 'payload/types'

import { resetFlashSaleProducts, updateFlashSaleProducts } from './hooks/updateFlashSaleProducts'

const flashSalesCollection: CollectionConfig = {
  slug: 'flashSalesCollection',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'startTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [updateFlashSaleProducts],
    afterDelete: [resetFlashSaleProducts],
  },
}

export default flashSalesCollection
