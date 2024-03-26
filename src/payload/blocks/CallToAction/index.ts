import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const CallToAction: Block = {
  slug: 'cta',
  imageURL: 'https://i.pinimg.com/564x/f0/0f/02/f00f0218aa011a510797817b82e336e8.jpg',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    invertBackground,
    richText(),
    linkGroup({
      appearances: ['primary', 'secondary'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
