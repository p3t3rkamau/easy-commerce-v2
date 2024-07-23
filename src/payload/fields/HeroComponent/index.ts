import type { Field } from 'payload/types'

import linkGroup from '../linkGroup'
import richText from '../richText'

export const heroImage: Field = {
  name: 'heroImage',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'group',
      name: 'SliderHero',
      fields: [
        richText(),
        linkGroup({
          overrides: {
            maxRows: 1,
          },
        }),
        {
          name: 'SliderImages',
          type: 'array',
          minRows: 2,
          maxRows: 20,
          fields: [
            {
              type: 'upload',
              name: 'media',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    {
      type: 'group',
      name: 'PotraitImage',
      fields: [
        {
          type: 'upload',
          name: 'media',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'group',
      name: 'SideImages',
      fields: [
        {
          name: 'Images',
          type: 'array',
          maxRows: 2,
          fields: [
            richText(),
            {
              type: 'upload',
              name: 'media',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
