import type { CollectionConfig } from 'payload/types'

const Sponsored: CollectionConfig = {
  slug: 'sponsored',
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
            if (data.name) {
              data.title = `${data.name}}`
            }
          },
        ],
      },
    },
    {
      name: 'TrendingNow',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: false,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'checkbox',
                  name: 'enableProduct',
                },
                {
                  type: 'checkbox',
                  name: 'enablePages',
                },
                {
                  type: 'checkbox',
                  name: 'enableCustomUrl',
                },
                {
                  type: 'checkbox',
                  name: 'enableCategories',
                },
              ],
            },
            {
              name: 'product',
              label: 'Document to link to Product',
              type: 'relationship',
              relationTo: 'products',
              admin: {
                condition: (_, siblingData) => siblingData.enableProduct,
              },
            },
            {
              name: 'reference',
              label: 'Document to link to',
              type: 'relationship',
              relationTo: ['pages'],
              maxDepth: 1,
              admin: {
                condition: (_, siblingData) => siblingData.enablePages,
              },
            },
            {
              name: 'CustomUrl',
              label: 'Custom URL',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.enableCustomUrl,
              },
            },
            {
              name: 'Categories',
              label: 'Document to link to Categories',
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
              admin: {
                condition: (_, siblingData) => siblingData.enableCategories,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'PopularProducts',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: false,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default Sponsored
