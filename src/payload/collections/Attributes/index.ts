import type { CollectionConfig } from 'payload/types'

const AttributeCollection: CollectionConfig = {
  slug: 'attributes_Collection',
  admin: {
    useAsTitle: 'Attributes_Field',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Attribute_Name',
      type: 'text',
      required: true,
      label: 'Attributes_Name',
    },
    {
      type: 'row', // required
      fields: [
        {
          name: 'Attribute_Property', // required
          type: 'array', // required
          label: 'Attribute_Property',
          minRows: 1,
          maxRows: 50,
          interfaceName: 'Attribute_Properties', // optional
          labels: {
            singular: 'AttributeProperty',
            plural: 'AttributeProperties',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default AttributeCollection
