import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

import classes from './index.module.scss'

interface CardProps {
  title: string
  price: number
  imageUrl: string
  slug: string
}

const Card: React.FC<CardProps> = ({ title, price, imageUrl, slug }) => {
  return (
    <div className={classes.card}>
      <div className={classes.imageContainer}>
        <img src={imageUrl} alt={title} className={classes.image} />
      </div>
      <div className={classes.cardBody}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.price}>Price: Ksh{price}</p>
        <a href={`/products/${slug}`} className={classes.link}>
          View Product <FaChevronRight />
        </a>
      </div>
    </div>
  )
}

export default Card
