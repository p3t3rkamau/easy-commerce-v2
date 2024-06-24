import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Post } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { PostHero } from '../../../_blocks/RelatedPosts'
import { Blocks } from '../../../_components/Blocks'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
export const dynamic = 'force-dynamic'

export default async function Post({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  console.log('Fetching post with slug:', slug)

  let post: Post | null = null

  try {
    post = await fetchDoc<Post>({
      collection: 'posts',
      slug,
      draft: isDraftMode,
    })

    console.log('Fetched post:', post)
  } catch (error) {
    console.error('Error fetching post:', error)
  }

  if (!post) {
    console.log('Post not found, rendering 404')
    notFound()
  }

  const { layout, relatedPosts } = post

  return (
    <React.Fragment>
      <PostHero post={post} />
      <Blocks blocks={layout} />
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedPosts',
            blockName: 'Related Post',
            relationTo: 'posts',
            introContent: [
              {
                type: 'h3',
                children: [
                  {
                    text: 'Related Posts',
                  },
                ],
              },
            ],
            docs: relatedPosts,
          },
        ]}
      />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const posts = await fetchDocs<Post>('posts')
    return posts?.map(({ slug }) => slug)
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  console.log('Generating metadata for slug:', slug)

  let post: Post | null = null

  try {
    post = await fetchDoc<Post>({
      collection: 'posts',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error('Error fetching post for metadata:', error)
  }

  return generateMeta({ doc: post })
}
