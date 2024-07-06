import type { CollectionConfig } from 'payload/types';
import { admins } from '../../access/admins';
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn';
import CustomOrderReceiptButton from '../../components/Receipt/ReceiptButton';
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy';
import { clearUserCart } from './hooks/clearUserCart';
import { populateOrderedBy } from './hooks/populateOrderedBy';
import { sendOrderEmails } from './hooks/sendOrderEmails';
import { updateUserPurchases } from './hooks/updateUserPurchases';
import calculateOrderTotal from './hooks/calculateOrderTotal';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    beforeChange: [calculateOrderTotal], // Added beforeChange hook
    afterChange: [updateUserPurchases, clearUserCart, sendOrderEmails],
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
      name: 'refId',
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
      admin: {
        readOnly: true, // Make it read-only in the admin UI
      },
    },
    {
      name: 'deliveryCost',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        readOnly: true, // Make it read-only in the admin UI
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
          type: 'json',
          label: 'Selected Attributes',
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'orderNotes',
      type: 'textarea',
    },
    {
      name: 'deliveryType',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'deliveryNote',
      type: 'textarea',
    },
    {
      name: 'customLocation',
      type: 'point',
    },
  ],
};
