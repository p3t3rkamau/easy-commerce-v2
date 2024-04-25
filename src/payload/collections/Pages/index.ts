import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
// import { CaseStudyCards } from '../../blocks/CaseStudyCards'
// import { CaseStudiesHighlight } from '../../blocks/CaseStudiesHighlight'
// import { CaseStudyCards } from '../../blocks/CaseStudyCards'
import { Content } from '../../blocks/Content'
import { ContentBlock } from '../../blocks/ContentBlock'
import { ContentMedia } from '../../blocks/ContentMedia'
import { FormBlock } from '../../blocks/Form'
import { MediaBlock } from '../../blocks/MediaBlock'
// import { ReusableContent } from '../../blocks/ReusableContent'
import { hero } from '../../fields/hero'
import link from '../../fields/link'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { adminsOrPublished } from './access/adminsOrPublished'
import { revalidatePage } from './hooks/revalidatePage'
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    afterChange: [revalidatePage],
    afterRead: [populateArchiveBlock],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                ContentMedia,
                // CardGrid,
                // Banner,
                // BlogContent,
                // Code,
                // BlogMarkdown,
                // // CaseStudyCards,
                // // CaseStudiesHighlight,
                // CodeFeature,
                // Accordion,
                // ContentGrid,
                // Form,
                FormBlock,
                ContentBlock,
                // HoverHighlights,
                // LinkGrid,
                // MediaContent,
                // Slider,
                // Steps,
                // StickyHighlights,
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'SlidingImages',
      label: 'Sliding Image',
      labels: {
        singular: 'image',
        plural: 'Images',
      },
      type: 'array',
      minRows: 4,
      maxRows: 20,
      fields: [
        {
          type: 'upload',
          name: 'media',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'Heading',
          type: 'text',
          required: true,
        },
        {
          name: 'Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'Accordion',
      label: 'Accordion',
      labels: {
        singular: 'accordion',
        plural: 'accordion',
      },
      type: 'array',
      minRows: 2,
      maxRows: 20,
      fields: [
        {
          label: ({ data }) => data?.title || 'Untitled',
          type: 'collapsible', // required
          fields: [
            // required
            {
              name: 'Heading',
              type: 'text',
              required: true,
            },
            {
              name: 'Description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'navItems',
              type: 'array',
              maxRows: 6,
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
