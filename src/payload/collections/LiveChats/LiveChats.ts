import type { CollectionConfig } from 'payload/types'

export const LiveChats: CollectionConfig = {
  slug: 'LiveChats',
  admin: {
    group: 'Message',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  access: {
    read: (): boolean => true,
  },
}
