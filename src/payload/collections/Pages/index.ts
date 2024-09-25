import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { CallToActionWithImage } from '../../blocks/CallToActionWithImage'
// import { CaseStudyCards } from '../../blocks/CaseStudyCards'
// import { CaseStudiesHighlight } from '../../blocks/CaseStudiesHighlight'
// import { CaseStudyCards } from '../../blocks/CaseStudyCards'
import { Content } from '../../blocks/Content'
import { ContentMedia } from '../../blocks/ContentMedia'
import { DealsArchive } from '../../blocks/DealsArchive'
import { DoubleImagesBlock } from '../../blocks/DoubleMedia/ManyImages'
import { EventArchive } from '../../blocks/EventArchive'
import { FlashSales } from '../../blocks/FlashSales'
import { FlexBanner } from '../../blocks/FlexBanner'
import HolidayBanners from '../../blocks/Holiday_Banner'
import { LastViewed } from '../../blocks/LastViewed'
import { MediaBlock } from '../../blocks/MediaBlock'
import PromoBanners from '../../blocks/Promotion_Banner'
import { Recommeded } from '../../blocks/Recommended'
import { ProductsSlider } from '../../blocks/SliderArchive'
import { TopDealsGrid } from '../../blocks/TopDealsGridArchive'
// import { ReusableContent } from '../../blocks/ReusableContent'
import { hero } from '../../fields/hero'
import { heroImage } from '../../fields/HeroComponent'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { adminsOrPublished } from './access/adminsOrPublished'
import { removeExpiredFlashSales } from './hooks/removeExpiredFlashSales'
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
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidatePage, removeExpiredFlashSales],
    afterRead: [populateArchiveBlock, removeExpiredFlashSales],
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
      name: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'HeaderCategories',
      type: 'relationship',
      relationTo: 'headercategories',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      admin: {
        position: 'sidebar',
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
          fields: [heroImage],
          label: 'Event Hero',
          admin: {
            description: 'Event Hero Image',
          },
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
                CallToActionWithImage,
                DoubleImagesBlock,
                ProductsSlider,
                Recommeded,
                LastViewed,
                FlashSales,
                EventArchive,
                DealsArchive,
                TopDealsGrid,
                FlexBanner,
                HolidayBanners,
                PromoBanners,
              ],
            },
          ],
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
              type: 'richText',
              required: true,
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
