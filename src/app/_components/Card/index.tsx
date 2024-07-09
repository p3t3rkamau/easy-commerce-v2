'use client'

import React from 'react'
import { Image } from '@nextui-org/react'
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
  price?: number | null
  newTag?: boolean
  relationTo?: 'products' | 'posts'
  doc?: Product | Post
}> = props => {
  const { title: titleFromProps, doc, newTag, relationTo } = props

  if (!doc) {
    return null
  }

  const { slug, discount, discountedPrice } = doc as Product // Cast to Product, will be ignored for Post
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
          {relationTo === 'products' && discount && (
            <div className={classes.discount}>
              <span>{discount}%</span>
            </div>
          )}
          <Media imgClassName={classes.image} resource={doc?.meta?.image} />
        </div>

        <div className={classes.content}>
          <span className={classes.title}>{titleToUse}</span>
          {relationTo === 'products' ? (
            <>
              <div className={classes.price}>
                <Price product={doc as Product} />
                {discountedPrice > 0 && (
                  <div className={classes.discountedPrice}>{discountedPrice}</div>
                )}
              </div>
              <AddToCartButton product={doc as Product} />
            </>
          ) : (
            <span className={classes.description}>{doc.description || ''}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Card
