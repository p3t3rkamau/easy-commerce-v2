// components/FavoriteProductsClient.tsx
'use client'
import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'

import classes from './index.module.scss'

export type FavouriteProductsProps = {
  blockType: 'favouriteProducts'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}
export const FavoriteProductsBlock: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])

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
            favoriteProducts.map(product => <Card key={product.url} doc={product} />)
          ) : (
            <p>No favorite products found.</p>
          )}
        </div>
      </Gutter>
    </div>
  )
}
