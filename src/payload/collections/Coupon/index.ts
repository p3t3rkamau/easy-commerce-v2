import type { CollectionConfig } from 'payload/types'

const Coupons: CollectionConfig = {
  slug: 'coupons',
  labels: {
    singular: 'Coupon',
    plural: 'Coupons',
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Coupon Code',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Percentage',
          value: 'percentage',
        },
        {
          label: 'Fixed Amount',
          value: 'fixed',
        },
      ],
      label: 'Discount Type',
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      label: 'Discount Value',
    },
    {
      name: 'applicableTo',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Products',
          value: 'products',
        },
        {
          label: 'Delivery Via Rider',
          value: 'deliveryRider',
        },
        {
          label: 'Delivery Via Matatu',
          value: 'deliveryMatatu',
        },
        {
          label: 'All Products',
          value: 'allProducts',
        },
      ],
      label: 'Applicable To',
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products', // Adjust with your actual relation name
      label: 'Select Products',
      admin: {
        condition: data => data.applicableTo === 'products',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      label: 'Expiry Date',
    },
  ],
}

export default Coupons
