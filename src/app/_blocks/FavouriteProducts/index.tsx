// components/FavoriteProductsClient.tsx
'use client'
import React, { useEffect, useState } from 'react'

import { Gutter } from '../../_components/Gutter'
import { FavoriteProductCard } from '../FavouriteProducts/FavoriteProductCard'

import classes from './index.module.scss'

export const FavoriteProductsBlock: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([])

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
                key={product.url}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                url={product.url}
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
