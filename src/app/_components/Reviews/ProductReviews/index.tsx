// ProductReviews.tsx
import React from 'react'

import ReviewItem from '../reviewItem'

import styles from './index.module.scss'

interface ProductReviewsProps {
  productName: string
  reviews: Array<{
    rating: number
    title: string
    content: string
    author: string
    date: string
    verified: boolean
  }>
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productName, reviews }) => {
  return (
    <div className={styles.productReviews}>
      <h6>PRODUCT REVIEWS ({reviews.length})</h6>
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  )
}

export default ProductReviews
