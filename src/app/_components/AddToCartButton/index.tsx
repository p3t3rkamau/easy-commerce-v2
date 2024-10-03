'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Post, Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { useToast } from '../../_providers/Toast/ToastContext'
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
  const { addToast } = useToast()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  const handleAddToCart = () => {
    const validatedQuantity = Math.max(1, quantity)
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0')

    if (product.ProductsAttributes && product.ProductsAttributes.length > 0) {
      const allAttributesSelected = product.ProductsAttributes.every(
        attribute => selectedAttributes && selectedAttributes[attribute.Attribute_Name]?.length > 0,
      )

      if (!allAttributesSelected) {
        addToast('Please select atleast one color or quantity before adding to cart.', 'error') // Show toast with error type
        return
      }
    }

    if (!isInCart) {
      addItemToCart({
        product,
        quantity: validatedQuantity,
        selectedAttributes,
        attributePrices: { totalPrice: storedTotalPrice },
      })
      addToast(`Added ${product.title} to cart!`, 'success') // Trigger toast with success type
      router.push('/cart')
    } else {
      router.push('/cart')
    }
  }

  const isOutOfStock = product?.OutOfStock

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
