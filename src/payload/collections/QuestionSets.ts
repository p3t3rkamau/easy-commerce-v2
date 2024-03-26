import type { CollectionConfig } from 'payload/types'

import { blockFields } from '../fields/blockFields'
import { slugField } from './../fields/slug'

export const QuestionSets: CollectionConfig = {
  slug: 'question-set',
  admin: {
    useAsTitle: 'QuestionSetTitle',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'QuestionSetTitle',
      label: 'Question set title',
      type: 'text',
      required: true,
    },
    blockFields({
      name: 'questionSet',
      fields: [
        {
          name: 'questionSet',
          type: 'array',
          fields: [
            {
              name: 'question',
              type: 'text',
              label: 'Question',
              required: true,
            },
            {
              name: 'answers',
              type: 'array',
              label: 'Answers',
              minRows: 2,
              required: true,
              labels: {
                singular: 'answer',
                plural: 'answers',
              },
              fields: [
                {
                  name: 'answer',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    }),
    slugField(),
  ],
}
