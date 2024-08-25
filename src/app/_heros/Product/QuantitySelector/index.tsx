import React from 'react'

import classes from './index.module.scss'

interface QuantitySelectorProps {
  quantity: number
  setQuantity: (quantity: number) => void
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className={classes.quantityWrapper}>
      <span className={classes.label}>Quantity:</span>
      <div className={classes.quantityControl}>
        <button onClick={decreaseQuantity} className={classes.button}>
          -
        </button>
        <input type="text" value={quantity} readOnly className={classes.quantityInput} />
        <button onClick={increaseQuantity} className={classes.button}>
          +
        </button>
      </div>
    </div>
  )
}
