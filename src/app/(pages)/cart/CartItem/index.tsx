'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, addItemToCart, selectedAttributes }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1
    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty), selectedAttributes })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1
    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty), selectedAttributes })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)
    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty), selectedAttributes })
  }

  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} quantity={quantity} />
        </div>

        {/* Display selected attributes */}
        {selectedAttributes && Object.entries(selectedAttributes).length > 0 && (
          <div className={classes.attributes}>
            {Object.entries(selectedAttributes).map(([key, value]) => (
              <p key={key} className={classes.attribute}>
                {key}: {value}
              </p>
            ))}
          </div>
        )}

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />

          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <Price
          product={product}
          button={false}
          quantity={quantity}
          selectedAttributes={selectedAttributes}
        />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
