import type { Block } from 'payload/types'

export const Recommeded: Block = {
  slug: 'recommended',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__9__nW6g7pSnb.png',
  labels: {
    singular: 'Recommended Slider',
    plural: 'Recommended Sliders',
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
// TODO: recommended archive should be pupulated with products or posts that users are clicking on or the one
