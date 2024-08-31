// components/FavoriteProductCard.tsx
import React from 'react'
import Image from 'next/image'

import { Product } from '../../../../payload/payload-types'
import { AddToCartButton } from '../../../_components/AddToCartButton'

import classes from './index.module.scss'

type FavoriteProductCardProps = {
  product: Product
}

export const FavoriteProductCard: React.FC<FavoriteProductCardProps> = ({ product }) => {
  const { title, price, OtherImages, slug } = product
  const imageUrl =
    OtherImages && OtherImages.length > 0 ? OtherImages[0].media.url : '/Easy-logo.svg'

  return (
    <div className={classes.card}>
      <div className={classes.imageWrapper}>
        <a href={`/products/${slug}`}>
          <Image src={imageUrl} alt={title} width={100} height={100} className={classes.image} />
        </a>
      </div>
      <div className={classes.details}>
        <a href={`/products/${slug}`} className={classes.name}>
          {title}
        </a>
        <p className={classes.price}>${price.toFixed()}</p>
        <AddToCartButton product={product} quantity={1} />
      </div>
    </div>
  )
}
