'use client'

import React from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../AddToCartButton'
import { Media } from '../Media'
import { Price } from '../Price'

import classes from './index.module.scss'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  Price?: number | null
  discount?: number | null
  discountedPrice?: number | null
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const { showCategories, title: titleFromProps, doc, discount, discountedPrice } = props
  console.log(discount, discountedPrice)

  if (!doc) {
    return null
  }

  const titleToUse = titleFromProps || doc.title

  return (
    <Link href={`/products/${doc.slug}`}>
      <div className={classes.card}>
        <div className={classes.mediaWrapper}>
          <div className={classes.discount}>
            <span>{doc.discount}%</span>
          </div>
          <Media imgClassName={classes.image} resource={doc.meta?.image} />
        </div>

        <div className={classes.content}>
          <span className={classes.title}>{titleToUse}</span>
          <div className={classes.price}>
            <Price product={doc} />
            <div className={classes.discountedPrize}>{doc.discountedPrice}</div>
          </div>
          <AddToCartButton product={doc} />
        </div>
      </div>
    </Link>
  )
}

export default Card
