'use client'
import React, { Fragment, useState } from 'react'
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
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const { showCategories, title: titleFromProps, doc } = props

  const titleToUse = titleFromProps || doc.title

  return (
    <Link href={`/products/${doc.slug}`}>
      <div className={classes.card}>
        <div className={classes.mediaWrapper}>
          <Media imgClassName={classes.image} resource={doc.meta?.image} />
        </div>

        <div className={classes.content}>
          <h4 className={classes.title}>{titleToUse}</h4>
          <div className={classes.price}>
            <Price product={doc} />
          </div>
          <AddToCartButton product={doc} />
        </div>
      </div>
    </Link>
  )
}

export default Card
