'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' // Update import

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  className?: string
  appearance?: Props['appearance']
}> = ({ product, quantity = 1, className, appearance = 'primary' }) => {
  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()
  const [isInCart, setIsInCart] = useState<boolean>(false) // Initialize as false
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  const handleAddToCart = () => {
    if (!isInCart) {
      addItemToCart({
        product,
        quantity,
      })
      router.push('/cart')
    }
  }

  const isOutOfStock = product.OutOfStock // Corrected casing of outOfStock

  return (
    <Button
      href={isInCart ? '/cart' : undefined} // Update href based on isInCart
      type={!isInCart ? 'button' : undefined}
      label={isOutOfStock ? 'Out of Stock' : isInCart ? `✓ View in cart` : `Add to cart`}
      el={isInCart ? 'link' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        appearance === 'default' && isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
        isOutOfStock ? classes.disabledButton : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleAddToCart}
      disabled={isOutOfStock} // Disable the button if the product is out of stock
    />
  )
}
