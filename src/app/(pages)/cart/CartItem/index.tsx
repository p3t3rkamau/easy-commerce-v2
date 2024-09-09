import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

// Function to generate a unique key for each item based on product ID and attributes
const generateKey = (productId, selectedAttributes) => {
  return `product-${productId}-${JSON.stringify(selectedAttributes)}`
}

// Function to retrieve price from local storage
const getPriceFromLocalStorage = (productId, selectedAttributes) => {
  const key = generateKey(productId, selectedAttributes)
  const storedPriceStr = localStorage.getItem(key)
  return storedPriceStr ? Number(storedPriceStr) : null
}

const CartItem = ({ product, title, metaImage, qty, addItemToCart, selectedAttributes }) => {
  const [quantity, setQuantity] = useState(qty)
  const [storedPrice, setStoredPrice] = useState<number | null>(null)

  useEffect(() => {
    if (selectedAttributes) {
      const price = getPriceFromLocalStorage(product.id, selectedAttributes)
      setStoredPrice(price)
    }
  }, [product.id, selectedAttributes])

  // Calculate the price based on attributes or use the stored price
  const calculatePrice = () => {
    if (selectedAttributes && storedPrice !== null) {
      return storedPrice * quantity
    } else {
      let basePrice = product.price || 0
      if (selectedAttributes) {
        Object.entries(selectedAttributes).forEach(([key, attributes]) => {
          attributes.forEach(attribute => {
            const attributePrice = product.attributePrices?.[key] || 0
            if (attributePrice) {
              basePrice += attributePrice * attribute.quantity
            }
          })
        })
      }
      return basePrice * quantity
    }
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
          <Price
            product={product}
            quantity={quantity}
            button={false}
            selectedAttributes={selectedAttributes}
            className={''}
          />
        </div>

        {/* Display selected attributes */}
        {selectedAttributes && Object.entries(selectedAttributes).length > 0 && (
          <div className={classes.attributes}>
            {Object.entries(selectedAttributes).map(([key, values]) => (
              <p key={key} className={classes.attribute}>
                {values.map(({ value, quantity }) => `${value} (${quantity})`).join(', ')}
              </p>
            ))}
          </div>
        )}

        {/* Remove quantity controls for products with attributes */}
        {!selectedAttributes && (
          <div className={classes.quantity}>
            <div
              className={classes.quantityBtn}
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
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
              onChange={e => setQuantity(Number(e.target.value) || 1)} // Default to 1 if invalid
            />

            <div className={classes.quantityBtn} onClick={() => setQuantity(q => q + 1)}>
              <Image
                src="/assets/icons/plus.svg"
                alt="plus"
                width={24}
                height={24}
                className={classes.qtnBt}
              />
            </div>
          </div>
        )}
      </div>

      <div className={classes.subtotalWrapper}>
        <span className={classes.price}>Ksh{calculatePrice().toFixed(2)}</span>
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
