// ErrorDisplay.tsx
import React from 'react'
import Image from 'next/image'

import classes from './index.module.scss'

const ErrorDisplay: React.FC = () => {
  return (
    <div className={classes.errorContainer}>
      <Image
        src="https://ik.imagekit.io/6cga8hi9z/All_Products/vecteezy_error-404-page-not-found-concept-illustration-web-page_7162540_soGXpbR8-m.jpg" // Replace with your actual error image path
        alt="Error searching products"
        width={200}
        height={200}
      />
      <p>Oops! Something went wrong while searching for products.</p>
    </div>
  )
}

export default ErrorDisplay
