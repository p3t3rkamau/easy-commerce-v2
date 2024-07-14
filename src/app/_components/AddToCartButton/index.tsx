import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Post, Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import AttributeModal from '../AttributesModal'
import { Button, Props } from '../Button'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product | Post
  quantity?: number
  className?: string
  appearance?: Props['appearance']
  selectedAttributes?: { [key: string]: { value: string; quantity: number }[] }
  attributePrices?: { [key: string]: number | undefined }
}> = ({
  product,
  quantity = 1,
  className,
  appearance = 'primary',
  selectedAttributes: initialSelectedAttributes,
  attributePrices,
}) => {
  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()
  const [isInCart, setIsInCart] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: { value: string; quantity: number }[]
  }>(initialSelectedAttributes || {})
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity)
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  const handleAddToCart = () => {
    const validatedQuantity = Math.max(1, currentQuantity) // Ensure quantity is at least 1

    // Check if all required attributes are selected
    if (product.ProductsAttributes && product.ProductsAttributes.length > 0) {
      const allAttributesSelected = product.ProductsAttributes.every(
        attribute => selectedAttributes && selectedAttributes[attribute.Attribute_Name]?.length > 0,
      )

      // if (!allAttributesSelected) {
      //   setShowModal(true)
      //   return
      // }
    }

    if (!isInCart) {
      addItemToCart({
        product,
        quantity: validatedQuantity,
        selectedAttributes,
        attributePrices, // Pass the attribute prices here
      })
      router.push('/cart')
    }
  }

  const isOutOfStock = product.OutOfStock

  return (
    <>
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
      {showModal && (
        <AttributeModal
          product={product}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          quantity={currentQuantity}
          setQuantity={setCurrentQuantity}
          onClose={() => setShowModal(false)}
          onAddToCart={() => {
            addItemToCart({
              product,
              quantity: currentQuantity,
              selectedAttributes,
              attributePrices, // Pass the attribute prices here
            })
            setShowModal(false)
            router.push('/cart')
          }}
        />
      )}
    </>
  )
}

export default AddToCartButton
