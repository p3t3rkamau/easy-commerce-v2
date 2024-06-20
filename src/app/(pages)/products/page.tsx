import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import SortAndFilter from '../../_components/SortComponent'
import BudgetFilter from './BudgetFilter'
import Filters from './Filters'

import classes from './index.module.scss'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<Page>('categories')
  } catch (error) {
    console.log(error)
  }

  const { Categories } = page

  return (
    <div className={classes.container}>
      <Gutter className={classes.MainContainer}>
        <div className={classes.products}>
          <div className={classes.filtersFlex}>
            <Filters categories={Categories} />
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
