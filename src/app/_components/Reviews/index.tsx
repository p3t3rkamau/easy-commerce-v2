// CustomerFeedback.tsx
import React from 'react'

import ProductReviews from './ProductReviews'
import VerifiedRatings from './verifiedRatings'

import styles from './index.module.scss'

interface CustomerFeedbackProps {
  productName: string
  averageRating: number
  totalRatings: number
  ratingCounts: { [key: number]: number }
  reviews: Array<{
    rating: number
    title: string
    content: string
    author: string
    date: string
    verified: boolean
  }>
}

const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({
  productName,
  averageRating,
  totalRatings,
  ratingCounts,
  reviews,
}) => {
  return (
    <div className={styles.customerFeedback}>
      <div className={styles.header}>
        <h6>Customer Feedback</h6>
        <a href="#" className={styles.seeAll}>
          SEE ALL &gt;
        </a>
      </div>
      <div className={styles.content}>
        <VerifiedRatings
          averageRating={averageRating}
          totalRatings={totalRatings}
          ratingCounts={ratingCounts}
        />
        <ProductReviews productName={productName} reviews={reviews} />
      </div>
    </div>
  )
}

export default CustomerFeedback
