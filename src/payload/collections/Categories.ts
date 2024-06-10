import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
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
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          label: 'Document to link to',
          type: 'relationship',
          relationTo: ['products'],
          maxDepth: 1,
        },
        {
          name: 'CustomUrl',
          label: 'Custom URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'subCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
  ],
}

export default Categories
