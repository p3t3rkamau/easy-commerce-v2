import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Post, Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product | Post
  quantity?: number
  className?: string
  appearance?: Props['appearance']
  selectedAttributes?: { [key: string]: string }
  attributePrices?: { [key: string]: number | undefined }
}> = ({
  product,
  quantity = 1,
  className,
  appearance = 'primary',
  selectedAttributes,
  attributePrices,
}) => {
  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()
  const [isInCart, setIsInCart] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  const handleAddToCart = () => {
    const validatedQuantity = Math.max(1, quantity)  // Ensure quantity is at least 1
    if (!isInCart) {
      addItemToCart({
        product,
        quantity: validatedQuantity,
        selectedAttributes,
        attributePrices,
      })
      router.push('/cart')
    }
  }

  const isOutOfStock = product.OutOfStock

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isOutOfStock ? 'Out of Stock' : isInCart ? `✓ View in cart` : `Add to cart`}
      el={isInCart ? 'link' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
        isOutOfStock ? classes.disabledButton : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleAddToCart}
      disabled={isOutOfStock}
    />
  )
}
