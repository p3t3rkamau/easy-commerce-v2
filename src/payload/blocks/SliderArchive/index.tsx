import { ColourTextField } from '@nouance/payload-better-fields-plugin'
import type { Block } from 'payload/types'

export const ProductsSlider: Block = {
  slug: 'products-slider',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__14__Ydf1cePoaP.png',
  labels: {
    singular: 'Products Slider',
    plural: 'Products Sliders',
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
      type: 'row',
      fields: [
        {
          name: 'NewTag',
          type: 'checkbox',
        },
        {
          name: 'CustomTag',
          type: 'text',
          admin: {
            description: 'maximum of 5 letters',
          },
        },
      ],
    },

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
