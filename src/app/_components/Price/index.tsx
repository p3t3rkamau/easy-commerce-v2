import React from 'react'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, quantity = 1, button } = props

  const formatPrice = (amount: number) => {
    return `${amount}`
  }

  return (
    <div className={classes.price}>
      <span className={classes.amount}>Ksh{formatPrice(product.price * quantity)}</span>
      {button && (
        <button className={classes[button]}>
          {button === 'addToCart' ? 'Add to Cart' : 'Remove from Cart'}
        </button>
      )}
    </div>
  )
}
