import React from 'react'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'

import classes from './index.module.scss'

export const CheckoutItem = ({
  product,
  title,
  metaImage,
  quantity,
  index,
  selectedAttributes,
}) => {
  return (
    <li className={classes.item} key={index}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>
        {selectedAttributes && Object.entries(selectedAttributes).length > 0 && (
          <div className={classes.attributes}>
            {Object.entries(selectedAttributes).map(([key, value]) => (
              <p key={key} className={classes.attribute}>
                {key}: {value}
              </p>
            ))}
          </div>
        )}
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>
        <Price product={product} button={false} quantity={quantity} />
      </div>
    </li>
  )
}
