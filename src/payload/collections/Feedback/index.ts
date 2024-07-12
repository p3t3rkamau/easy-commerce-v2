import type { CollectionConfig } from 'payload/types'

const FeedBackForm: CollectionConfig = {
  slug: 'feedbackform',
  admin: {
    useAsTitle: 'title',
    group: 'Admin',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'questionId',
      type: 'number',
      required: true,
    },
    {
      name: 'responseType',
      type: 'radio',
      options: [
        {
          label: 'Multiple Choice',
          value: 'multipleChoice',
        },
        {
          label: 'Text',
          value: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'response',
      type: 'text',
      required: true,
    },
  ],
}

export default FeedBackForm
