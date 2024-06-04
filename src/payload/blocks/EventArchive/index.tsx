import type { Block } from 'payload/types'

export const EventArchive: Block = {
  slug: 'Event-Archive',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__12__tcuqlXEx9.png',
  labels: {
    singular: 'EventArchive',
    plural: 'EventArchives',
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
