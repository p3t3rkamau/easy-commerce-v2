import { ColourTextField } from '@nouance/payload-better-fields-plugin'
import type { Block } from 'payload/types'

export const TopDealsGrid: Block = {
  slug: 'TopDealsGrid',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__12__tcuqlXEx9.png',
  labels: {
    singular: 'TopDealsGrid',
    plural: 'TopDealsGrids',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        ...ColourTextField({
          name: 'BackgroundColor',
          required: true,
        }),
        ...ColourTextField({
          name: 'TextColor',
          required: true,
        }),
      ],
    },
    {
      type: 'relationship',
      name: 'selectedDocs',
      label: 'Selection',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description:
          'Select individual products to show in the grid (maximum of 12 products expected)',
      },
      validate: value => {
        if (Array.isArray(value) && value.length > 12) {
          return 'You can only select up to 12 products.'
        }
        return true
      },
    },
  ],
}
