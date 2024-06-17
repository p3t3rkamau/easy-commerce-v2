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
          name: 'StartNow',
          label: 'Start Now',
        },
        {
          type: 'checkbox',
          name: 'Schedule',
          label: 'Schedule',
        },
        {
          type: 'checkbox',
          name: 'CustomReschedule',
          label: 'Custom Reschedule',
        },
      ],
    },
    {
      label: 'Start Now Settings',
      type: 'collapsible',
      admin: {
        condition: (_, siblingData) => siblingData.StartNow,
      },
      fields: [
        {
          name: 'StartNowBtn',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'Timer',
          type: 'text',
          admin: {
            description: 'Flash sale will start immediately after saving.',
            readOnly: true,
          },
          hooks: {
            beforeChange: [
              ({ data, value }) => {
                console.log('Data before change in Timer:', data)
                if (data.StartNow) {
                  const timer = calculateTimer({
                    data,
                    collection: undefined,
                    context: undefined,
                    field: undefined,
                    global: undefined,
                    req: undefined,
                    siblingData: undefined,
                  })
                  console.log('Calculated timer:', timer)
                  return timer || value // Ensure we return the existing value if no timer is calculated
                }
                return value // Return existing value when StartNow is false
              },
            ],
          },
        },
      ],
    },
    {
      label: 'Schedule Settings',
      type: 'collapsible',
      admin: {
        condition: (_, siblingData) => siblingData.Schedule,
      },
      fields: [
        {
          name: 'ScheduleTime',
          type: 'select',
          options: [
            { label: '1 hour', value: '1h' },
            { label: '2 hours', value: '2h' },
            { label: '3 hours', value: '3h' },
          ],
          admin: {
            description: 'Select the duration for the scheduled flash sale.',
          },
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
          name: 'CustomSchedule',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'Select the custom date and time for the flash sale.',
          },
        },
      ],
    },
  ],
}
