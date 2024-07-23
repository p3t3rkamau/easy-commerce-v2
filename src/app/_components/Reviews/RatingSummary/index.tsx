import React from 'react'

import styles from './index.module.scss'

interface RatingSummaryProps {
  ratingCounts: { [key: number]: number }
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ ratingCounts }) => {
  const totalRatings = Object.values(ratingCounts).reduce((a, b) => a + b, 0)

  return (
    <div className={styles.ratingSummary}>
      {[5, 4, 3, 2, 1].map(star => (
        <div key={star} className={styles.ratingBar}>
          <span className={styles.starCount}>{star}</span>
          <div className={styles.barContainer}>
            <div
              className={styles.bar}
              style={{
                width: `${((ratingCounts[star] || 0) / totalRatings) * 100}%`,
              }}
            ></div>
          </div>
          <span className={styles.count}>{ratingCounts[star] || 0}</span>
        </div>
      ))}
    </div>
  )
}

export default RatingSummary
