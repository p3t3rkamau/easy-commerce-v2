import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { CallToActionWithImage } from '../../blocks/CallToActionWithImage'
import { Content } from '../../blocks/Content'
import { ContentMedia } from '../../blocks/ContentMedia'
import { DealsArchive } from '../../blocks/DealsArchive'
import { DoubleImagesBlock } from '../../blocks/DoubleMedia/ManyImages'
import { EventArchive } from '../../blocks/EventArchive'
import { FlashSales } from '../../blocks/FlashSales'
import { LastViewed } from '../../blocks/LastViewed'
import { MediaBlock } from '../../blocks/MediaBlock'
import { Recommeded } from '../../blocks/Recommended'
import { ProductsSlider } from '../../blocks/SliderArchive'
import { TopDealsGrid } from '../../blocks/TopDealsGridArchive'
import { hero } from '../../fields/hero'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig = {
  access: {
    create: admins,
    delete: () => false,
    read: adminsOrPublished,
    update: admins,
  },
  admin: {
    defaultColumns: ['title', 'category', 'publishDate', 'tags', 'status'],
    // livePreview: {
    //   url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/posts/${data?.slug}`,
    // },
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/posts/${doc?.slug as string}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
      type: 'relationship',
    },
    {
      name: 'publishedOn',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
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
      type: 'date',
    },
    {
      name: 'authors',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
      type: 'array',
    },
    {
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
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
              ],
              required: true,
              type: 'blocks',
            },
          ],
          label: 'Content',
        },
      ],
      type: 'tabs',
    },
    {
      name: 'relatedPosts',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: 'posts',
      type: 'relationship',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateArchiveBlock, populateAuthors],
    beforeChange: [populatePublishedDate],
  },
  slug: 'posts',
  versions: {
    drafts: true,
  },
}
