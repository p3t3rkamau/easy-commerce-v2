// ErrorMessage.tsx
import React from 'react'

import styles from './index.module.scss' // Make sure to create this file for styles

type ErrorMessageProps = {
  message?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'No products found. Please try to refresh the page.',
}) => {
  return (
    <div className={styles.errorMessage}>
      <h2>Oops!</h2>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
