import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import classes from './index.module.scss'

interface CardProps {
  title: string
  price: number
  imageUrl: string
  slug: string
}

const Card: React.FC<CardProps> = ({ title, price, imageUrl, slug }) => {
  return (
    <Link href={`/products/${slug}`} className={classes.card}>
      <div className={classes.imageContainer}>
        <Image src={imageUrl} width={300} height={300} alt={title} className={classes.image} />
      </div>
      <div className={classes.cardBody}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.price}>Price: Ksh{price}</p>
      </div>
    </Link>
  )
}

export default Card
