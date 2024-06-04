import type { CollectionConfig } from 'payload/types'

const DeliveryLocations: CollectionConfig = {
  slug: 'deliveryLocations',
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
            if (data.address && data.region && data.googlepin) {
              data.title = `${data.address}, ${data.city}, ${data.state}`
            }
          },
        ],
      },
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      admin: {
        description: 'Eg Nairobi',
      },
    },
    {
      name: 'AdditionalInformation',
      type: 'textarea',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
      required: true,
      admin: {
        description: 'Eg Buruburu',
      },
    },
    {
      name: 'googlepin',
      type: 'text',
    },
  ],
}

export default DeliveryLocations
// TODO: add handle for matatu or delivery by rider
