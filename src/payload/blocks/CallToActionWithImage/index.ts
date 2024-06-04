import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const CallToActionWithImage: Block = {
  slug: 'CtaWithImage',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__5__CcTNKLTm5.png',
  labels: {
    singular: 'CTA with Image',
    plural: 'CTA with Image',
  },
  fields: [
    invertBackground,
    richText(),
    {
      name: 'media',
      relationTo: 'media',
      required: true,
      type: 'upload',
    },
    linkGroup({
      appearances: ['primary', 'secondary'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
