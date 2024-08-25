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
      return `$${selectedAttributePrice.toFixed(2)}`
    }
    if (minAttributePrice !== null && maxAttributePrice !== null) {
      return minAttributePrice === maxAttributePrice
        ? `$${minAttributePrice.toFixed(2)}`
        : `$${minAttributePrice.toFixed(2)} - $${maxAttributePrice.toFixed(2)}`
    }
    return `$${normalPrice.toFixed(2)}`
  }

  return (
    <div className={classes.details}>
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.ratingContainer}>
        <div className={classes.stars}>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < Math.floor(averageRating) ? classes.starFilled : classes.starEmpty}
            />
          ))}
        </div>
        <span className={classes.reviewCount}>({totalReviews} Reviews)</span>
        <span className={classes.stock}>{OutOfStock ? 'Out of Stock' : 'In Stock'}</span>
      </div>
      <p className={classes.price}>{displayPrice()}</p>
    </div>
  )
}
