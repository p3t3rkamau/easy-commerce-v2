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
          maxRows: 15,
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
