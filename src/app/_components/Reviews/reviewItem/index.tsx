// ReviewItem.tsx
import React from 'react'

import styles from './index.module.scss'

interface ReviewItemProps {
  review: {
    rating: number
    title: string
    content: string
    author: string
    date: string
    verified: boolean
  }
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.stars}>{/* Implement star rating display here */}</div>
      <h6>{review.title}</h6>
      <p>{review.content}</p>
      <div className={styles.reviewMeta}>
        <span>{review.date}</span>
        <span>by {review.author}</span>
        {review.verified && <span className={styles.verified}>Verified Purchase</span>}
      </div>
    </div>
  )
}

export default ReviewItem
