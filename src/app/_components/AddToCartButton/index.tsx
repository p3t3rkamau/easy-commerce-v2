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
    } else {
      // Navigate to cart directly if the product is already in the cart
      router.push('/cart')
    }
  }

  const isOutOfStock = product.OutOfStock

  return (
    <Button
      href={isInCart ? undefined : undefined} // href removed to prevent interference with click handling
      type="button" // Always set as button since click will handle both add to cart and navigation
      label={isOutOfStock ? 'Out of Stock' : isInCart ? `View in cart` : `Add to cart`}
      el="button" // Always a button since we handle navigation manually
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        isInCart && classes.green, // Green class for items already in cart
        !hasInitializedCart && classes.hidden, // Hidden if cart is not initialized
        isOutOfStock ? classes.disabledButton : '', // Disabled styling for out of stock
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleAddToCart} // onClick handles both adding to cart and navigation
      disabled={isOutOfStock} // Disable button if out of stock
    />
  )
}

export default AddToCartButton
