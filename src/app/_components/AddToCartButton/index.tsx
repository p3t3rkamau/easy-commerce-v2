'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Post, Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product | Post
  quantity: number
  className?: string
  appearance?: Props['appearance']
  selectedAttributes?: { [key: string]: { value: string; quantity: number }[] }
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
    const validatedQuantity = Math.max(1, quantity)
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0')

    // Check if all required attributes are selected
    if (product.ProductsAttributes && product.ProductsAttributes.length > 0) {
      const allAttributesSelected = product.ProductsAttributes.every(
        attribute => selectedAttributes && selectedAttributes[attribute.Attribute_Name]?.length > 0,
      )

      // Prevent adding to cart if attributes are not selected
      if (!allAttributesSelected) {
        alert('Please select all required attributes before adding to cart.')
        return
      }
    }

    if (!isInCart) {
      addItemToCart({
        product,
        quantity: validatedQuantity,
        selectedAttributes,
        attributePrices: { totalPrice: storedTotalPrice }, // Update with stored total price
      })
      router.push('/cart') // Navigate to the cart after adding
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

export default AddToCartButton
