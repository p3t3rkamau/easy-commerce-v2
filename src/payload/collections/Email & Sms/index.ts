import type { CollectionConfig } from 'payload/types'

import { CustomEmailComponent } from '../../components/ChatInterface/index'
export const EMailSms: CollectionConfig = {
  slug: 'EmailBulkySms',
  admin: {
    group: 'Message',
    components: {
      views: {
        List: CustomEmailComponent,
      },
    },
  },
  fields: [
    {
      name: 'CustomerEmail',
      type: 'text',
    },
    {
      name: 'AgentEmail',
      type: 'text',
    },
    {
      name: 'AiAgentEmail',
      type: 'text',
    },
  ],
  access: {
    read: (): boolean => true,
  },
}
