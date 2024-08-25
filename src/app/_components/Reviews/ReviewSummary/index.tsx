import React from 'react'
import { FaStar } from 'react-icons/fa'

import classes from './index.module.scss'

interface ReviewsSummaryProps {
  averageRating: number
  totalReviews: number
}

export const ReviewsSummary: React.FC<ReviewsSummaryProps> = ({ averageRating, totalReviews }) => {
  return (
    <div className={classes.reviewsSummary}>
      <div className={classes.stars}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < Math.floor(averageRating) ? classes.starFilled : classes.starEmpty}
          />
        ))}
      </div>
      <span className={classes.rating}>{averageRating.toFixed(1)}</span>
      <span className={classes.reviewCount}>({totalReviews} Reviews)</span>
    </div>
  )
}
