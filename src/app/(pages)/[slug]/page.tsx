import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Category, Page } from '../../../payload/payload-types'
import StaticHome from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import Banner from '../../_components/Banner/Banner'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import { generateMeta } from '../../_utilities/generateMeta'
// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic'

import LogoSlider from '../../_components/BrandSlider'
import ProductGrid from '../../_components/CardGrid/ProductGrid'
import CategoriesComponent from '../../_components/Categories'
import ExpandableFloatingActionButton from '../../_components/ChatwidgetComponent/_components/FloatingAction/ExpandableFloatingActionButton'
import FlexBanner from '../../_components/FlexBanner'
import { HeaderCategoriesLayout } from '../../_components/HeaderCategories'
import TopBar from '../../_components/Topbar'
import { EventHero } from '../../_heros/EventHero'
import { Scroller } from '../../AcertinityUi_components/Scroller/scroller'
import CarouselView from '../../CoreUi_components/couresel.jsx'

import FeedbackPopup from '@/app/_components/FeedbackForm'

// import { HomeCarousel } from '../../_components/HomeCarousel/HomeCarousel'
// import Promotion from '../../_components/Promotion'
import classes from './index.module.scss'

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
    // console.log(page)
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page && slug === 'home') {
    page = StaticHome
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout, Categories, heroImage, HeaderCategories } = page
  // console.log('slug:', slug)
  // console.log('layout:', layout)
  const noCategories = !Categories || Categories.length === 0

  return (
    <React.Fragment>
      <section>
        <HeaderCategoriesLayout HeaderCategories={HeaderCategories} />
        <Banner />
        {/* <Hero {...hero} /> */}
        {/* <HomeCarousel /> */}
        {/* <PlaceholdersAndVanishInputDemo /> */}
        {/* <EventHero {...heroImage} />
        <FlexBanner /> */}

        <Gutter className={classes.home}>
          {!noCategories && <CategoriesComponent categories={Categories} />}
          <Blocks
            blocks={layout}
            disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
          />
          <ProductGrid />
          <Scroller />
          <FeedbackPopup />
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

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static home page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page && slug === 'home') {
    page = staticHome
  }

  return generateMeta({ doc: page })
}

// import React from 'react'
// import { Metadata } from 'next'
// import { draftMode } from 'next/headers'
// import { notFound } from 'next/navigation'

// import {
//   CATEGORIES_CACHE_KEY,
//   getCachedData,
//   invalidateCache,
//   PAGES_CACHE_KEY,
// } from '../../../payload/hooks/revalidatePage'
// // @ts-ignore
// import { Category, Page } from '../../../payload/payload-types'
// import { staticHome } from '../../../payload/seed/home-static'
// import { fetchDoc } from '../../_api/fetchDoc'
// import { fetchDocs } from '../../_api/fetchDocs'
// import CallToActionWithImage from '../../_blocks/CallToActionWithImage'
// import GridBlock from '../../_blocks/GridBlock'
// import { Blocks } from '../../_components/Blocks'
// import ProductGrid from '../../_components/CardGrid/ProductGrid'
// import CardStyles from '../../_components/CardStyles'
// import CartDropDown from '../../_components/CartDropDown'
// import Categories from '../../_components/Categories'
// import ExpandableFloatingActionButton from '../../_components/ChatwidgetComponent/_components/FloatingAction/ExpandableFloatingActionButton'
// import FlexBanner from '../../_components/FlexBanner'
// import { Gutter } from '../../_components/Gutter'
// import { Hero } from '../../_components/Hero'
// import EventHero from '../../_heros/EventHero'
// import { generateMeta } from '../../_utilities/generateMeta'

// import classes from './index.module.scss'

// // If you are using Payload Cloud, you don't need Next.js to cache the data
// // as Cloudflare handles caching for you. In that case, you can remove this line.
// export const dynamic = 'force-dynamic'

// export default async function Page({ params: { slug = 'home' } }) {
//   const { isEnabled: isDraftMode } = draftMode()

//   let page: Page | null = null
//   let categories: Category[] | null = null

//   // Fetch data from cache or source
//   page = await getCachedData(PAGES_CACHE_KEY, async () => {
//     return await fetchDoc<Page>({
//       collection: 'pages',
//       slug,
//       draft: isDraftMode,
//     })
//   })

//   categories = await getCachedData(CATEGORIES_CACHE_KEY, async () => {
//     return await fetchDocs<Category>('categories')
//   })

//   // If no `home` page exists, render a static one using dummy content
//   if (!page && slug === 'home') {
//     page = staticHome
//   }

//   if (!page) {
//     return notFound()
//   }

//   const { hero, layout } = page

//   return (
//     <React.Fragment>
//       <section>
//         <Hero {...hero} />
//         <EventHero />
//         <FlexBanner />

//         <Gutter className={classes.home}>
//           {/* <CartDropDown /> */}

//           {slug === 'home' && <Categories categories={categories} />}
//           <CallToActionWithImage richText={[]} blockType={'cta'} />
//           <Blocks
//             blocks={layout}
//             disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
//           />
//           <ProductGrid />

//           <ExpandableFloatingActionButton />
//         </Gutter>
//       </section>
//     </React.Fragment>
//   )
// }

// export async function generateStaticParams() {
//   try {
//     const pages = await fetchDocs<Page>('pages')
//     return pages?.map(({ slug }) => slug)
//   } catch (error) {
//     return []
//   }
// }

// export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
//   const { isEnabled: isDraftMode } = draftMode()

//   let page: Page | null = null

//   // Fetch page data from cache or source
//   page = await getCachedData(`${PAGES_CACHE_KEY}_${slug}`, async () => {
//     return await fetchDoc<Page>({
//       collection: 'pages',
//       slug,
//       draft: isDraftMode,
//     })
//   })

//   if (!page && slug === 'home') {
//     page = staticHome
//   }

//   return generateMeta({ doc: page })
// }
