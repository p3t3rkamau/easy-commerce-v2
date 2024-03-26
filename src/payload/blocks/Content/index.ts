import type { Block, Field } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import link from '../../fields/link'
import richText from '../../fields/richText'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        value: 'oneThird',
        label: 'One Third',
      },
      {
        value: 'half',
        label: 'Half',
      },
      {
        value: 'twoThirds',
        label: 'Two Thirds',
      },
      {
        value: 'full',
        label: 'Full',
      },
    ],
  },
  richText(),
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  imageURL:
    'https://static.semrush.com/blog/uploads/media/f8/d5/f8d5a4a17cee232e584e27fd05e0b149/ST45PwLjS_d1MCT3CgMkJb8Br15jtnSLNLyxAg6ZhmKq9F_XJAHLQ25dOK6sWvMklysrZRMLZJMqG76z3RlBJ_BHlzv2Fk5EBtzl3leNpQJuC8bpKmV9_LUWwkxwbtVurx0aHrG7uEzxjFWdCzsH-C0.png',
  fields: [
    invertBackground,
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
