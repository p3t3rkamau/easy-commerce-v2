import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'

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
        <Image src={imageUrl} width={300} height={300} alt={title} className={classes.image} />
      </div>
      <div className={classes.cardBody}>
        <span className={classes.title}>{title}</span>
        <p className={classes.price}>Price: Ksh{price}</p>
        <a href={`/products/${slug}`} className={classes.link}>
          View Product <FaChevronRight />
        </a>
      </div>
    </div>
  )
}

export default Card
