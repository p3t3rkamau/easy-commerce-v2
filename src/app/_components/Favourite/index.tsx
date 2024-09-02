import React, { useEffect, useState } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

interface FavoriteButtonProps {
  product: Product
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'outline' | 'solid'
}

interface ProductDetails {
  id: string
  title: string
  price: number
  slug: string
  imageUrl: string
  url: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  className = '',
  size = 'medium',
  variant = 'default',
}) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!product || !product.id) return // Guard clause

    const favoriteItems: ProductDetails[] = JSON.parse(
      localStorage.getItem('favoriteItems') || '[]',
    )
    const isProductFavorite = favoriteItems.some(item => item.id === product.id)
    setIsFavorite(isProductFavorite)
  }, [product])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product) return

    let favoriteItems: ProductDetails[] = JSON.parse(localStorage.getItem('favoriteItems') || '[]')

    if (!isFavorite) {
      const newFavoriteItem: ProductDetails = {
        id: product.id || uuidv4(),
        title: product.title,
        price: product.price,
        slug: product.slug || '',
        imageUrl: product.meta?.image?.imagekit.url || '',
        url: `/products/${product.slug}`,
      }
      favoriteItems = [...favoriteItems, newFavoriteItem]
    } else {
      favoriteItems = favoriteItems.filter(item => item.id !== product.id)
    }

    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    setIsFavorite(!isFavorite)
  }

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  }

  const variantClasses = {
    default: 'bg-white hover:bg-gray-100',
    outline: 'bg-transparent border-2 border-current hover:bg-gray-100',
    solid: isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
  }

  if (!product) {
    return null // or return a loading spinner or placeholder
  }

  return (
    <button
      className={`${classes.favoriteButton} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={toggleFavorite}
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  )
}

export default FavoriteButton
