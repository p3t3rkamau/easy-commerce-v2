import React, { useState } from 'react'

import classes from './index.module.scss'
interface Props {
  onCouponApply: (discountedCost: number) => void
  currentCost: number
}

const CouponForm: React.FC<Props> = ({ onCouponApply, currentCost }) => {
  const [coupon, setCoupon] = useState<string>('')

  const handleApplyCoupon = async () => {
    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: coupon }),
      })

      if (!response.ok) {
        throw new Error('Invalid coupon code')
      }

      const { type, value, applicableTo } = await response.json()

      let discountedCost = currentCost

      if (
        applicableTo === 'deliveryRider' ||
        applicableTo === 'products' ||
        applicableTo === 'deliveryMatatu' ||
        applicableTo === 'allProducts'
      ) {
        if (type === 'percentage') {
          discountedCost = currentCost * (1 - value / 100)
        } else if (type === 'fixed') {
          discountedCost = currentCost - value
        }
      }

      onCouponApply(discountedCost)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={classes.couponForm}>
      <h6 className={classes.couponHeader}>Apply Coupon</h6>
      <input
        type="text"
        value={coupon}
        onChange={e => setCoupon(e.target.value)}
        placeholder="Enter coupon code"
        className={classes.couponInput}
      />
      <button onClick={handleApplyCoupon} className={classes.applyButton}>
        Apply
      </button>
    </div>
  )
}

export default CouponForm
