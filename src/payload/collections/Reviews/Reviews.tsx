import { CollectionConfig } from 'payload/types'

const Reviews: CollectionConfig = {
  slug: 'Reviews',
  admin: {
    useAsTitle: 'title',
    group: 'Admin',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data.product && data.rating) {
              data.title = `${data.product} - Rating: ${data.rating}`
            }
          },
        ],
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'rating',
      type: 'select',
      options: [
        { label: '1 Star', value: '1' },
        { label: '2 Stars', value: '2' },
        { label: '3 Stars', value: '3' },
        { label: '4 Stars', value: '4' },
        { label: '5 Stars', value: '5' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'verifiedPurchase',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Reviews
