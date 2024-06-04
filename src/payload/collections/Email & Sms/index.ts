import type { CollectionConfig } from 'payload/types'

export const EMailSms: CollectionConfig = {
  slug: 'EmailBulkySms',
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
