import type { CollectionConfig } from 'payload/types'

const Promotions: CollectionConfig = {
  slug: 'promotions',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Promotions
