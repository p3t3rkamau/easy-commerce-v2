import { TelephoneField } from '@nouance/payload-better-fields-plugin'
import type { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'productsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Products page',
    },
    ...TelephoneField({
      label: 'Sales WhatsApp Number',
      name: 'WhatsAppNumber',
      admin: {
        placeholder: '+254 789 653678',
      },
    }),
  ],
}
