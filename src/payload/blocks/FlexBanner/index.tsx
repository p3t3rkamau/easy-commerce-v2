import type { Block } from 'payload/types'

import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const FlexBanner: Block = {
  fields: [
    {
      type: 'group',
      name: 'FlexBanners',
      fields: [
        {
          name: 'HorizontalBanners',
          type: 'array',
          minRows: 2,
          maxRows: 2,
          fields: [
            richText(),
            linkGroup({
              overrides: {
                maxRows: 1,
              },
            }),
            {
              type: 'upload',
              name: 'media',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  slug: 'FlexBanner',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__2__ZUcStG3Qk.png',
}
