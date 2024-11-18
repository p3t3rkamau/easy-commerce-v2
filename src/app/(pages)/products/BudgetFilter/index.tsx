import React, { useEffect, useState } from 'react'

import { useFilter } from '../../../_providers/Filter'

import styles from './budget.module.scss'

const BudgetFilter: React.FC = () => {
  const { priceRange, setPriceRange } = useFilter()
  const [minPrice, setMinPrice] = useState<number>(priceRange.min)
  const [maxPrice, setMaxPrice] = useState<number>(priceRange.max)

  useEffect(() => {
    // Update local state when priceRange in context changes
    setMinPrice(priceRange.min)
    setMaxPrice(priceRange.max)
  }, [priceRange])

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(e.target.value)
    setMinPrice(newMinPrice)
    setPriceRange(prev => ({ ...prev, min: newMinPrice }))
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(e.target.value)
    setMaxPrice(newMaxPrice)
    setPriceRange(prev => ({ ...prev, max: newMaxPrice }))
  }

  return (
    <div className={styles['budget-filter']}>
      <div>
        <div className={styles.flex}>
          <label className={styles.label}>Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min Price"
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label className={styles.label}>Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max Price"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  )
}

export default BudgetFilter
