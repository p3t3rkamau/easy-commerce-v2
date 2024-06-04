import type { Block } from 'payload/types'

export const LastViewed: Block = {
  slug: 'last-viewed',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__10__PAT0FYrbR.png',
  labels: {
    singular: 'Last viewed',
    plural: 'Last viewed',
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
