'use client'

import React from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../AddToCartButton'
import { Media } from '../Media'
import { Price } from '../Price'

import classes from './index.module.scss'

export const FlashSalesCard: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  discount?: number | null
  discountedPrice?: string | null
  Price?: number | null
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const { showCategories, title: titleFromProps, doc, discountedPrice, discount } = props

  if (!doc) {
    return null // Render nothing if no doc is provided
  }

  const titleToUse = titleFromProps || doc.title

  return (
    <Link href={`/products/${doc.slug}`}>
      <div className={classes.card}>
        <div className={classes.mediaWrapper}>
          <div className={classes.discount}>
            <span>{discount}%</span>
          </div>
          <Media imgClassName={classes.image} resource={doc.meta?.image} />
        </div>

        <div className={classes.content}>
          <span className={classes.title}>{titleToUse}</span>
          <div className={classes.itemsleft}>2 items left</div>
          <div className={classes.mainProgress}>
            <div className={classes.progress}></div>
          </div>
          <div className={classes.price}>
            <Price product={doc} />
            <div className={classes.discountedPrize}>{discountedPrice}</div>
          </div>
          {/* <AddToCartButton product={doc} /> */}
        </div>
      </div>
    </Link>
  )
}

export default FlashSalesCard
