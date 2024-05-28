import type { CollectionConfig } from 'payload/types'

export const DeliveryLocations: CollectionConfig = {
  slug: 'deliveryLocations',
  admin: {
    useAsTitle: 'address',
    group: 'Admin',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'zipCode',
      type: 'text',
      required: true,
    },
    // Add any other fields related to delivery locations
  ],
}
