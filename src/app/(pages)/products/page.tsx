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

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    console.log(error)
  }

  const allowedCategories = [
    'Non Edibles',
    'Edibles',
    'Tools & Equipments',
    'Cake Boxes',
    'Uncategorized',
    'Edible Imaging',
    'New Arrivals',
    'Shop By Brand',
    'Accesories',
    'Flavourings',
    'Moulds',
    'Cake Toppers',
    'Packaging',
  ]

  // Filter fetched categories to only include allowed ones
  const filteredCategories = categories?.filter(category =>
    allowedCategories.includes(category.title),
  )

  return (
    <div className={classes.container}>
      <Gutter className={classes.MainContainer}>
        <div className={classes.products}>
          <div className={classes.filtersFlex}>
            {/* Pass only the filtered categories */}
            <Filters categories={filteredCategories} />
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
