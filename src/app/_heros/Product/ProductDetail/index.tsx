import React from 'react'
import { FaStar } from 'react-icons/fa'

import { Category, Product } from '../../../../payload/payload-types'

import classes from '../index.module.scss'

interface ProductDetailsProps {
  product: Product
  selectedAttributePrice: number | null
  minAttributePrice: number | null
  maxAttributePrice: number | null
  averageRating: number
  totalReviews: number
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  selectedAttributePrice,
  minAttributePrice,
  maxAttributePrice,
  averageRating,
  totalReviews,
}) => {
  const { title, OutOfStock, price: normalPrice } = product

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
      <div className={classes.ratingContainer}>
        <div className={classes.stars}>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              style={{
                color: index < Math.floor(averageRating) ? '#ffc107' : '#e0e0e0',
              }}
            />
          ))}
        </div>
        <div className={classes.flex}>
          <span className={classes.reviewCount}>({totalReviews} Reviews)</span>
          <span className={classes.stock}>{OutOfStock ? 'Out of Stock' : 'In Stock'}</span>
        </div>
      </div>
      <h5 className={classes.price}>{displayPrice()}</h5>
    </div>
  )
}
