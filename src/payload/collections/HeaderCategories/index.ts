import type { CollectionConfig } from 'payload/types'

const HeaderCategories: CollectionConfig = {
  slug: 'headercategories',
  admin: {
    useAsTitle: 'Header Categories',
    group: 'Customize',
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
            if (data.Category) {
              // Start with the Category name
              data.title = `${data.Category}`

              // If Subcategory exists and has at least one element
              if (data.Subcategory && data.Subcategory.length > 0) {
                const subcategories = data.Subcategory.map(sub => sub.Name).join(', ')
                data.title += ` (Subcategories: ${subcategories})`

                // Handle Attributes within Subcategories
                data.Subcategory.forEach(sub => {
                  if (sub.Attribute && sub.Attribute.length > 0) {
                    const attributes = sub.Attribute.map(attr => attr.Name).join(', ')
                    data.title += ` [Attributes: ${attributes}]`
                  }
                })
              }
            }
          },
        ],
      },
    },
    {
      name: 'Category',
      type: 'text',
      required: true,
      label: 'Category',
    },
    {
      name: 'Subcategory', // required
      type: 'array', // required
      label: 'Subcategory',
      minRows: 1,
      maxRows: 15,
      interfaceName: 'SubCategory', // optional
      labels: {
        singular: 'SubCategory',
        plural: 'SubCategories',
      },
      fields: [
        {
          name: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Link',
          type: 'text',
        },
        {
          name: 'SubcategoryImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'Attribute', // required
          type: 'array', // required
          label: 'Attribute',
          minRows: 1,
          maxRows: 25,
          interfaceName: 'Attribute', // optional
          labels: {
            singular: 'Attribute',
            plural: 'Attributes',
          },
          fields: [
            {
              name: 'Name',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'Link',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default HeaderCategories
