// VerifiedRatings.tsx
import React from 'react'

import RatingSummary from '../RatingSummary'

import styles from './index.module.scss'

interface VerifiedRatingsProps {
  averageRating: number
  totalRatings: number
  ratingCounts: { [key: number]: number }
}

const VerifiedRatings: React.FC<VerifiedRatingsProps> = ({
  averageRating,
  totalRatings,
  ratingCounts,
}) => {
  return (
    <div className={styles.verifiedRatings}>
      <h6>VERIFIED RATINGS ({totalRatings})</h6>
      <div className={styles.averageRating}>
        <span className={styles.rating}>{averageRating.toFixed(1)}</span>
        <span className={styles.outOf}>/5</span>
      </div>
      <div className={styles.stars}>{/* Implement star rating display here */}</div>
      <p>{totalRatings} verified ratings</p>
      <RatingSummary ratingCounts={ratingCounts} />
    </div>
  )
}

export default VerifiedRatings
