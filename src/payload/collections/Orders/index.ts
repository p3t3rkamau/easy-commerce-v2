import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import CustomOrderReceiptButton from '../../components/Receipt/ReceiptButton'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import calculateOrderTotal from './hooks/calculateOrderTotal'
import { cancelOrderHook } from './hooks/cancelorder'
import { clearUserCart } from './hooks/clearUserCart'
import { deductStockAfterPurchase } from './hooks/deductStockAfterPurchase'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { sendOrderEmails } from './hooks/sendOrderEmails'
import sendOrderToWhatsApp from './hooks/sendWhatsappMess'
import { updateUserPurchases } from './hooks/updateUserPurchases'
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    beforeChange: [calculateOrderTotal], // Added beforeChange hook
    afterChange: [
      updateUserPurchases,
      clearUserCart,
      sendOrderEmails,
      sendOrderToWhatsApp,
      deductStockAfterPurchase,
      cancelOrderHook,
    ],
  },
  access: {
    read: adminsOrOrderedBy,
    update: adminsOrOrderedBy,
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
      label: 'Mpesa Ref Id',
      name: 'refId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'deliveryCost',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'canceled',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
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
          name: 'selectedAttributes',
          type: 'text',
          label: 'Selected Attributes',
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'orderNotes',
      type: 'textarea',
    },
    {
      name: 'deliveryType',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'locationLabel',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'deliveryNote',
      type: 'textarea',
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
  ],
}
