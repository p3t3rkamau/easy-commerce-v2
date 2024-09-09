import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import SortAndFilter from '../../_components/SortComponent'
import Filters from './Filters'

import classes from './index.module.scss'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })
  } catch (error) {
    console.log(error)
  }

  // Filter to ensure we only pass valid Category objects
  const categories: Category[] = (page?.Categories || []).filter(
    (category): category is Category => typeof category !== 'string',
  )

  return (
    <div className={classes.container}>
      <Gutter className={classes.MainContainer}>
        <div className={classes.products}>
          <div className={classes.filtersFlex}>
            {/* Pass the categories from page into Filters */}
            <Filters categories={categories} />
          </div>
          <div>
            <SortAndFilter />
            <Blocks blocks={page?.layout} disableTopPadding={true} />
          </div>
        </div>
      </Gutter>
      <HR />
    </div>
  )
}

export default Products
