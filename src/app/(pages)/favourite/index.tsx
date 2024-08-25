import React from 'react'
import { Metadata } from 'next'

import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Favorite Items',
  description: 'A list of your favorite products',
  openGraph: mergeOpenGraph({
    title: 'Favorites Page',
    url: '/favorites',
  }),
}

interface FavoriteItem {
  slug: string
  title: string
  price: number
  discountedPrice?: number
  discount?: number
  image: string
}

export default async function Favorite() {
  // Fetch favorite items from localStorage
  const favorites =
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : []

  return (
    <Gutter>
      <h1>Your Favorites</h1>
      <div className="grid">
        {favorites.length > 0 ? (
          favorites.map((product: FavoriteItem, index: number) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <p>No favorite items found.</p>
        )}
      </div>
    </Gutter>
  )
}
