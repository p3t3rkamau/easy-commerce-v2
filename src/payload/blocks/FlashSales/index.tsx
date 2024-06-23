import { ColourTextField } from '@nouance/payload-better-fields-plugin'
import { Block, FieldHook } from 'payload/types'

const calculateTimer: FieldHook = ({ data }) => {
  console.log('Data received in calculateTimer:', data)

  if (!data.StartNow) {
    console.log('StartNow is not set.')
    return ''
  }

  const now = new Date()
  const endTime = new Date(data.StartNowBtn)

  if (isNaN(endTime.getTime())) {
    console.error('Invalid end time:', data.StartNowBtn)
    return 'Invalid date'
  }

  const timeDiff = endTime.getTime() - now.getTime()
  if (timeDiff <= 0) return '00:00:00'

  const hours = Math.floor(timeDiff / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
}

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
