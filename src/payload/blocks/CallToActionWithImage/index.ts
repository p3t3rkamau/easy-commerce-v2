import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const CallToActionWithImage: Block = {
  slug: 'CtaWithImage',
  imageURL: 'https://i.pinimg.com/564x/f0/0f/02/f00f0218aa011a510797817b82e336e8.jpg',
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
