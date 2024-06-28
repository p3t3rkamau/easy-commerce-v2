import React from 'react'

import { Category, Product } from '../../../../payload/payload-types'

import classes from '../index.module.scss'

interface ProductDetailsProps {
  product: Product
  selectedAttributePrice: number | null
  minAttributePrice: number | null
  maxAttributePrice: number | null
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  selectedAttributePrice,
  minAttributePrice,
  maxAttributePrice,
}) => {
  const { title, categories, OutOfStock, price: normalPrice } = product

  const displayPrice = () => {
    if (selectedAttributePrice !== null) {
      return `Ksh${selectedAttributePrice.toFixed(2)}`
    }

    if (minAttributePrice !== null && maxAttributePrice !== null) {
      return minAttributePrice === maxAttributePrice
        ? `Ksh${minAttributePrice.toFixed(2)}`
        : `Ksh${minAttributePrice.toFixed(2)} - Ksh${maxAttributePrice.toFixed(2)}`
    }

    return `Ksh${normalPrice.toFixed(2)}`
  }

  return (
    <div className={classes.details}>
      <h3 className={classes.title}>{title}</h3>

      <div className={classes.categoryWrapper}>
        <div className={classes.categories}>
          {categories?.map((category, index) => {
            const { title: categoryTitle } = category as Category
            const titleToUse = categoryTitle || 'Generic'
            return (
              <p key={index} className={classes.category}>
                {titleToUse}
              </p>
            )
          })}
        </div>
      </div>
      <p className={`${classes.stock} ${OutOfStock ? classes.outOfStock : classes.inStock}`}>
        {OutOfStock ? 'Out of stock' : 'In stock'}
      </p>
      <p className={classes.price}>{displayPrice()}</p>
    </div>
  )
}
