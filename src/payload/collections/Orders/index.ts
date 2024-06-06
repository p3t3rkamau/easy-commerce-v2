import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import CustomOrderReceiptButton from '../../components/Receipt/ReceiptButton'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
// import { initiateMpesaPayment } from './hooks/initiateMpesaPayment'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'
import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'stripePaymentIntentID',
      label: 'Stripe Payment Intent ID',
      type: 'text',
      admin: {
        position: 'sidebar',
        components: {
          Field: LinkToPaymentIntent,
        },
      },
    },
    {
      name: 'DeliveryLocation',
      label: 'Delivery Location',
      type: 'relationship',
      relationTo: 'deliveryLocations',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mpesaTransactionRef',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'GenerateReceiptButton', // Custom field name for the button
      type: 'text', // Using text type as a placeholder for the button
      admin: {
        readOnly: true,
        position: 'sidebar',
        components: {
          Field: CustomOrderReceiptButton, // Using the custom button component
        },
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
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
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
        {
          name: 'colorId',
          label: 'Color Id',
          type: 'text',
        },
        {
          name: 'size',
          label: 'Size',
          type: 'text',
        },
        {
          name: 'volumeOrHeight',
          label: 'Volume or Height',
          type: 'text',
        },
      ],
    },
  ],
}
