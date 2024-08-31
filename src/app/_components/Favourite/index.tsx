import React, { useEffect, useState } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

interface FavoriteButtonProps {
  product: Product
  className?: string
}

interface ProductDetails {
  uniqueId: string
  title: string
  price: number
  slug: string
}

const generateUniqueId = (title: string, price: number, slug?: string): string => {
  return `${title}-${price}-${slug || ''}`.replace(/\s+/g, '-').toLowerCase()
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product, className = '' }) => {
  const uniqueId = generateUniqueId(product?.title, product?.price, product?.slug)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const favoriteItems: ProductDetails[] = JSON.parse(
      localStorage.getItem('favoriteItems') || '[]',
    )
    const isProductFavorite = favoriteItems.some(item => item.uniqueId === uniqueId)
    setIsFavorite(isProductFavorite)
  }, [uniqueId])

  const toggleFavorite = () => {
    let favoriteItems: ProductDetails[] = JSON.parse(localStorage.getItem('favoriteItems') || '[]')

    if (!isFavorite) {
      const newFavoriteItem: ProductDetails = {
        uniqueId,
        title: product?.title,
        price: product?.price,
        slug: product?.slug || '', // default empty string if slug is not present
      }
      favoriteItems = [...favoriteItems, newFavoriteItem]
    } else {
      favoriteItems = favoriteItems.filter(item => item.uniqueId !== uniqueId)
    }

    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    setIsFavorite(!isFavorite)
  }

  return (
    <button
      className={`${classes.favoriteButton} ${isFavorite ? classes.favorite : ''} ${className}`}
      onClick={toggleFavorite}
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  )
}

export default FavoriteButton
