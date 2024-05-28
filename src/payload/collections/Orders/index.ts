import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
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
      label: 'DeliveryLocation',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        position: 'sidebar',
      },
    },
    // {
    //   name: 'DeliverLocation',
    //   label: 'Delivery Location',
    //   type: 'relationship',
    //   relationTo: 'deliveryLocations',
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },
    {
      name: 'mpesaTransactionRef',
      type: 'text',
      admin: {
        position: 'sidebar',
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
          required: true,
        },
        {
          name: 'size',
          label: 'Size',
          type: 'text',
          required: true,
        },
        {
          name: 'volumeOrHeight',
          label: 'Volume or Height',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
