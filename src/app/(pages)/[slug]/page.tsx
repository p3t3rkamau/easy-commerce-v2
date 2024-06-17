import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import {
  CATEGORIES_CACHE_KEY,
  getCachedData,
  invalidateCache,
  PAGES_CACHE_KEY,
} from '../../../payload/hooks/revalidatePage'
// @ts-ignore
import { Category, Page } from '../../../payload/payload-types'
import { staticHome } from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import CallToActionWithImage from '../../_blocks/CallToActionWithImage'
import GridBlock from '../../_blocks/GridBlock'
import { Blocks } from '../../_components/Blocks'
import ProductGrid from '../../_components/CardGrid/ProductGrid'
import CardStyles from '../../_components/CardStyles'
import CartDropDown from '../../_components/CartDropDown'
import Categories from '../../_components/Categories'
import ExpandableFloatingActionButton from '../../_components/ChatwidgetComponent/_components/FloatingAction/ExpandableFloatingActionButton'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import EventHero from '../../_heros/EventHero'
import { generateMeta } from '../../_utilities/generateMeta'

import classes from './index.module.scss'

// If you are using Payload Cloud, you don't need Next.js to cache the data
// as Cloudflare handles caching for you. In that case, you can remove this line.
export const dynamic = 'force-dynamic'

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  // Fetch data from cache or source
  page = await getCachedData(PAGES_CACHE_KEY, async () => {
    return await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  })

  categories = await getCachedData(CATEGORIES_CACHE_KEY, async () => {
    return await fetchDocs<Category>('categories')
  })

  // If no `home` page exists, render a static one using dummy content
  if (!page && slug === 'home') {
    page = staticHome
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <React.Fragment>
      <section>
        <Hero {...hero} />
        <EventHero />

        <Gutter className={classes.home}>
          {/* <CartDropDown /> */}

          {slug === 'home' && <Categories categories={categories} />}
          <CallToActionWithImage richText={[]} blockType={'cta'} />
          <Blocks
            blocks={layout}
            disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
          />
          <CardStyles />
          <GridBlock />
          <ProductGrid />
          <ExpandableFloatingActionButton />
        </Gutter>
      </section>
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  // Fetch page data from cache or source
  page = await getCachedData(`${PAGES_CACHE_KEY}_${slug}`, async () => {
    return await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  })

  if (!page && slug === 'home') {
    page = staticHome
  }

  return generateMeta({ doc: page })
}
