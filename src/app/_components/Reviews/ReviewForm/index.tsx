import React, { useState } from 'react'
import axios from 'axios'

import styles from './index.module.scss'
interface ReviewFormProps {
  productId: string
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/reviews', {
        name,
        message,
        rating,
        product: productId,
      })
      // Reset form or show success message
      setName('')
      setMessage('')
      setRating('')
      alert('Review submitted successfully!')
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your Name"
        required
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Your Review"
        required
      ></textarea>
      <select value={rating} onChange={e => setRating(e.target.value)} required>
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map(value => (
          <option key={value} value={value.toString()}>
            {value.toFixed(1)}
          </option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  )
}

export default ReviewForm
