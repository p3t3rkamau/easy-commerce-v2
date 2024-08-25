import React, { useEffect, useState } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

import classes from './index.module.scss'

interface FavoriteButtonProps {
  productName: string
  productPrice: string
  productUrl: string
  mainImage: any
  className?: string // Add className to the interface
}

interface ProductDetails {
  name: string
  price: string
  url: string
  imageUrl: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productName,
  productPrice,
  productUrl,
  mainImage,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const favoriteItems: ProductDetails[] = JSON.parse(
      localStorage.getItem('favoriteItems') || '[]',
    )
    const isProductFavorite = favoriteItems.some(item => item.url === productUrl)
    setIsFavorite(isProductFavorite)
  }, [productUrl])

  const toggleFavorite = () => {
    let favoriteItems: ProductDetails[] = JSON.parse(localStorage.getItem('favoriteItems') || '[]')

    if (!isFavorite) {
      const newFavoriteItem: ProductDetails = {
        name: productName,
        price: productPrice,
        url: productUrl,
        imageUrl: mainImage?.media?.imagekit?.url || '/Easy-logo.svg',
      }
      localStorage.setItem('favoriteItems', JSON.stringify([...favoriteItems, newFavoriteItem]))
    } else {
      favoriteItems = favoriteItems.filter(item => item.url !== productUrl)
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    }

    setIsFavorite(!isFavorite)
  }

  return (
    <button
      className={`${classes.favoriteButton} ${isFavorite ? classes.favorite : ''}`}
      onClick={toggleFavorite}
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  )
}

export default FavoriteButton
