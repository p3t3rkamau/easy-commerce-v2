// components/FavoriteProductCard.tsx
import React from 'react'

import classes from './index.module.scss'

type FavoriteProductCardProps = {
  name: string
  price: number
  imageUrl: string
  url: string
}

export const FavoriteProductCard: React.FC<FavoriteProductCardProps> = ({
  name,
  price,
  imageUrl,
  url,
}) => {
  return (
    <div className={classes.card}>
      <a href={url}>
        <img src={imageUrl} alt={name} className={classes.image} />
        <div className={classes.details}>
          <h4 className={classes.name}>{name}</h4>
          <p className={classes.price}>${price}</p>
        </div>
      </a>
    </div>
  )
}
