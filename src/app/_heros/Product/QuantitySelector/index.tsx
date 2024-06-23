import React from 'react'

import classes from './index.module.scss'

interface QuantitySelectorProps {
  quantity: number
  setQuantity: (quantity: number) => void
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  return (
    <div className={classes.quantityWrapper}>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        min="1"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        className={classes.quantityInput}
      />
    </div>
  )
}
