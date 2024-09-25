// components/FlashSaleProgress.tsx
import React, { useEffect, useState } from 'react'

import styles from './index.module.scss' // Import the styles

interface FlashSaleProgressProps {
  endTime: string
  totalStock: number
  soldItems: number
}

const FlashSaleProgress: React.FC<FlashSaleProgressProps> = ({
  endTime,
  totalStock,
  soldItems,
}) => {
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date()
      const end = new Date(endTime)
      const timeDiff = end.getTime() - now.getTime()

      if (timeDiff > 0) {
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
        setTimeRemaining(`${hours}H:${minutes}M:${seconds}S`)
      } else {
        setTimeRemaining('Sale Ended')
      }
    }

    calculateRemainingTime()
    const interval = setInterval(calculateRemainingTime, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  const remainingProducts = totalStock - soldItems

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Flash Sale!</h3>
      <p className={styles.timer}>Time Remaining: {timeRemaining}</p>
      <p className={styles.productsRemaining}>Products Remaining: {remainingProducts}</p>
    </div>
  )
}

export default FlashSaleProgress
