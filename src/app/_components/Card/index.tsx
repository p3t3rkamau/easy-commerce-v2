'use client'

import React from 'react'
import Link from 'next/link'

import { Post, Product } from '../../../payload/payload-types'
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
  newTag?: boolean
  relationTo?: 'products' | 'posts'
  doc?: Product | Post
}> = props => {
  const { title: titleFromProps, doc, newTag, relationTo } = props

  const { slug, discount, discountedPrice } = doc || {}

  if (!doc) {
    return null
  }

  const titleToUse = titleFromProps || doc.title
  const href = `/${relationTo}/${slug}`

  return (
    <Link href={href}>
      <div className={classes.card}>
        <div className={classes.mediaWrapper}>
          {newTag && (
            <div className={classes.newTag}>
              <span>New</span>
            </div>
          )}
          {discount && (
            <div className={classes.discount}>
              <span>{discount}%</span>
            </div>
          )}
          <Media imgClassName={classes.image} resource={doc?.meta?.image} />
        </div>

        <div className={classes.content}>
          <span className={classes.title}>{titleToUse}</span>
          <div className={classes.price}>
            <Price product={doc} />
            {discountedPrice > 0 && (
              <div className={classes.discountedPrice}>{discountedPrice}</div>
            )}
          </div>
          <AddToCartButton product={doc} />
        </div>
      </div>
    </Link>
  )
}

export default Card
