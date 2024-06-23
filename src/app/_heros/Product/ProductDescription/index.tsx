import React from 'react'

import classes from './index.module.scss'

interface ProductDescriptionProps {
  description: string
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <div className={classes.description}>
      <h6>Description</h6>
      <p>{description}</p>
    </div>
  )
}
