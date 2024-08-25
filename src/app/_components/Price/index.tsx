import React from 'react'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
  selectedAttributes?: { [key: string]: { value: string; quantity: number } }
}> = props => {
  const { product, quantity = 1, button, selectedAttributes } = props

  const calculatePrice = () => {
    let basePrice = product.price || 0
    let attributesPrice = 0

    if (selectedAttributes) {
      Object.entries(selectedAttributes).forEach(([attr, { quantity }]) => {
        const attributePrice = product.attributePrices?.[attr] || 0
        attributesPrice += (attributePrice || 0) * quantity
      })
    }

    return basePrice + attributesPrice
  }

  const formatPrice = (amount: number) => {
    return `${amount.toFixed(2)}`
  }

  return (
    <div className={classes.price}>
      <span className={classes.amount}>Ksh{formatPrice(calculatePrice() * quantity)}</span>
      {button && (
        <button className={classes[button]}>
          {button === 'addToCart' ? 'Add to Cart' : 'Remove from Cart'}
        </button>
      )}
    </div>
  )
}
