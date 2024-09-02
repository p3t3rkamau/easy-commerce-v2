'use client'
import React, { useEffect, useState } from 'react'

import { Gutter } from '../../_components/Gutter'
import { FavoriteProductCard } from '../FavouriteProducts/FavoriteProductCard'

import classes from './index.module.scss'

interface FavoriteProduct {
  id: string
  name: string
  price: number
  imageUrl: string
  url: string
}

export const FavoriteProductsBlock: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([])

  useEffect(() => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems') || '[]')
    setFavoriteProducts(favoriteItems)
  }, [])

  return (
    <div className={classes.favoriteProducts}>
      <Gutter>
        <h3 className={classes.title}>Your Favorite Products</h3>
        <div className={classes.grid}>
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map(product => (
              <FavoriteProductCard
                key={product?.id || `${product?.name}-${product?.price}`}
                name={product.name}
                price={product?.price}
                imageUrl={product?.imageUrl}
                url={product?.url}
              />
            ))
          ) : (
            <p>No favorite products found.</p>
          )}
        </div>
      </Gutter>
    </div>
  )
}
