import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  imageURL: 'https://i.pinimg.com/originals/e0/2c/8b/e02c8b152a7fcb56ab168fc6a17f7ecf.jpg',
  fields: [
    invertBackground,
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
