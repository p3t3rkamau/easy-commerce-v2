import { NumberField } from '@nouance/payload-better-fields-plugin'
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'

const calculateDiscountedPrice = ({
  data,
}: {
  data: { price: number; discount: number }
}): number => {
  const { price, discount } = data
  if (typeof price === 'number' && typeof discount === 'number') {
    return price - (price * discount) / 100
  }
  return price
}

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stripeProductID', '_status'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [beforeProductChange],
    afterChange: [revalidateProduct],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            {
              type: 'row',
              fields: [
                ...NumberField(
                  {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    required: true,
                    admin: {
                      readOnly: false,
                      hidden: false,
                    },
                  },
                  {
                    prefix: 'Ksh ',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
                ...NumberField(
                  {
                    name: 'discount',
                    label: 'Discount',
                    type: 'number',
                    admin: {
                      readOnly: false,
                      hidden: false,
                    },
                  },
                  {
                    suffix: ' %',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
                {
                  name: 'discountedPrice',
                  label: 'Discounted Price',
                  type: 'number',
                  admin: {
                    readOnly: true, // Make this field read-only to prevent manual edits
                  },
                  hooks: {
                    beforeValidate: [
                      ({ data, siblingData }) => {
                        // Use siblingData for real-time updates
                        const updatedData = {
                          ...data,
                          ...siblingData,
                        }
                        // @ts-expect-error
                        data.discountedPrice = calculateDiscountedPrice({ data: updatedData })
                      },
                    ],
                    beforeChange: [
                      ({ data, siblingData }) => {
                        // Use siblingData for real-time updates
                        const updatedData = {
                          ...data,
                          ...siblingData,
                        }
                        // @ts-expect-error
                        data.discountedPrice = calculateDiscountedPrice({ data: updatedData })
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'FlashSalesItems',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ProductsAttributes',
      type: 'relationship',
      relationTo: 'attributesCollection',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    slugField(),
    {
      name: 'OtherImages',
      label: 'Other Images',
      labels: {
        singular: 'image',
        plural: 'Images',
      },
      type: 'array',
      minRows: 4,
      maxRows: 6,
      fields: [
        {
          type: 'upload',
          name: 'media',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'OutOfStock',
      label: 'Out Of Stock',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        // readOnly: true,
        // hidden: true,
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'brands', // required
      type: 'select', // required
      // hasMany: true,
      admin: {
        isClearable: true,
        position: 'sidebar',
        isSortable: true,
      },
      options: [
        { label: 'Americolor', value: 'Americolor' },
        { label: 'BakeKing', value: 'BakeKing' },
        { label: 'Bakeland', value: 'Bakeland' },
        { label: 'Bakels', value: 'Bakels' },
        { label: "Baker's Delight", value: "Baker's Delight" },
        { label: 'Bakeware', value: 'Bakeware' },
        { label: 'Blossoms', value: 'Blossoms' },
        { label: 'Candy', value: 'Candy' },
        { label: 'Caroline Cupcakes', value: 'Caroline Cupcakes' },
        { label: 'Clovers', value: 'Clovers' },
        { label: 'Collata', value: 'Collata' },
        { label: 'Dairyland', value: 'Dairyland' },
        { label: 'Dr Gusto', value: 'Dr Gusto' },
        { label: 'Easy Bake Supplies Limited', value: 'Easy Bake Supplies Limited' },
        { label: "Elly's", value: "Elly's" },
        { label: 'Essence', value: 'Essence' },
        { label: 'Eurocas', value: 'Eurocas' },
        { label: 'Europea', value: 'Europea' },
        { label: 'Flour', value: 'Flour' },
        { label: 'Hamilworth', value: 'Hamilworth' },
        { label: 'Kenafric Industries', value: 'Kenafric Industries' },
        { label: 'KSL', value: 'KSL' },
        { label: 'Lato', value: 'Lato' },
        { label: 'Lyons', value: 'Lyons' },
        { label: 'Maimun', value: 'Maimun' },
        { label: 'Nestle', value: 'Nestle' },
        { label: 'Pradip', value: 'Pradip' },
        { label: 'Pristine', value: 'Pristine' },
        { label: 'Puratos', value: 'Puratos' },
        { label: 'Rainbow dust', value: 'Rainbow dust' },
        { label: 'Strawberries', value: 'Strawberries' },
        { label: 'Sugarflair', value: 'Sugarflair' },
        { label: 'Top Lure', value: 'Top Lure' },
        { label: 'Tri Clover', value: 'Tri Clover' },
        { label: 'Ustam', value: 'Ustam' },
        { label: 'Wilton', value: 'Wilton' },
        { label: 'Zeelandia', value: 'Zeelandia' },
        { label: 'Zesta', value: 'Zesta' },
      ],
    },
    {
      name: 'Reviews',
      type: 'relationship',
      relationTo: 'Reviews',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Products
