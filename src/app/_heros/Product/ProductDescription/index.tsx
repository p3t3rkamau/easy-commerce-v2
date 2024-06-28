import React, { useState } from 'react'

import classes from './index.module.scss'

interface ProductDescriptionProps {
  description: string
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  const truncateDescription = (desc: string, wordLimit: number) => {
    const words = desc.split(' ')
    if (words.length <= wordLimit) {
      return desc
    }
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  const wordLimit = 12
  const displayedDescription = isExpanded
    ? description
    : truncateDescription(description, wordLimit)

  return (
    <div className={classes.description}>
      <h6>Description</h6>
      <p>{displayedDescription}</p>
      {description.split(' ').length > wordLimit && (
        <button onClick={toggleExpansion} className={classes.toggleButton}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  )
}

export default ProductDescription
