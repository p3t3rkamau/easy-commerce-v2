import { ColourTextField, NumberField } from '@nouance/payload-better-fields-plugin'
import type { CollectionConfig } from 'payload/types'

const AttributeCollection: CollectionConfig = {
  slug: 'attributesCollection',
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
            if (data.Attribute_Name) {
              data.title = `${data.Attribute_Name}`
              if (data.Attribute_Property && data.Attribute_Property.length > 0) {
                const properties = data.Attribute_Property.map(prop => prop.label).join(', ')
                data.title += ` (${properties})`
              }
            }
          },
        ],
      },
    },
    {
      name: 'Attribute_Name',
      type: 'text',
      required: true,
      label: 'Attribute Name',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'Attribute_Property',
          type: 'array',
          label: 'Attribute Property',
          minRows: 1,
          maxRows: 15000,
          labels: {
            singular: 'Attribute Property',
            plural: 'Attribute Properties',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'type',
                  type: 'select',
                  label: 'Value Type',
                  options: [
                    { label: 'Text', value: 'text' },
                    { label: 'Color', value: 'color' },
                    { label: 'Number', value: 'number' },
                    { label: 'Brand', value: 'brand' },
                  ],
                },
                {
                  name: 'Value',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.type === 'text',
                  },
                },
                ...ColourTextField({
                  name: 'colourValue',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.type === 'color',
                  },
                }),
                {
                  name: 'NumberValue',
                  type: 'number',
                  required: true,
                  admin: {
                    readOnly: false,
                    hidden: false,
                    condition: (_, siblingData) => siblingData.type === 'number',
                  },
                },

                {
                  name: 'Value',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.type === 'brand',
                  },
                },
                {
                  type: 'upload',
                  name: 'media',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    readOnly: false,
                    hidden: false,
                    condition: (_, siblingData) => siblingData.type === 'brand',
                  },
                },

                ...NumberField(
                  {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    admin: {
                      readOnly: false,
                      hidden: false,
                      condition: (_, siblingData) => siblingData.type !== 'brand',
                    },
                  },
                  {
                    prefix: 'Ksh ',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
                {
                  name: 'stock',
                  type: 'number',
                  required: true,
                  label: 'Stock Quantity',
                  admin: {
                    readOnly: false,
                    hidden: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default AttributeCollection
