import { ColourTextField } from '@nouance/payload-better-fields-plugin'
import { Block, FieldHook } from 'payload/types'

export const FlashSales: Block = {
  slug: 'flash-sales',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__11__cGdGG8kez.png',
  labels: {
    singular: 'FlashSale',
    plural: 'flashSales',
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
        description: 'Select individual products to show in the slider',
      },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'checkbox',
          name: 'CustomReschedule',
          label: 'schedule',
        },
      ],
    },
    {
      label: 'Custom Reschedule Settings',
      type: 'collapsible',
      admin: {
        condition: (_, siblingData) => siblingData.CustomReschedule,
      },
      fields: [
        {
          name: 'StartTime',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'Select the start time for the flash sale.',
          },
        },
        {
          name: 'EndTime',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'Select the end time for the flash sale.',
          },
        },
      ],
    },
  ],
}
