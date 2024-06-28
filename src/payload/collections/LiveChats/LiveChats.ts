import type { CollectionConfig } from 'payload/types'

import { CustomMessageComponent } from '../../components/ChatInterface/index' // Adjust the path accordingly

export const LiveChats: CollectionConfig = {
  slug: 'live-chats',
  fields: [
    {
      name: 'Customer',
      type: 'text',
    },
    {
      name: 'Agent',
      type: 'text',
    },
    {
      name: 'Aiagent',
      type: 'text',
    },
    {
      name: 'EmailCustomer',
      label: 'Customer Email',
      type: 'text',
    },
    {
      name: 'EmailAgent',
      label: 'Agent Email',
      type: 'text',
    },
  ],
  admin: {
    useAsTitle: 'Customer',
    group: 'Message',
    components: {
      views: {
        List: CustomMessageComponent, // Default view for editing
      },
    },
  },
  access: {
    read: (): boolean => true,
  },
}
