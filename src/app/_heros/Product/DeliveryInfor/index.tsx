import React from 'react'
import { FaExchangeAlt, FaTruck } from 'react-icons/fa'

import styles from './index.module.scss'

interface DeliveryInfoProps {
  onEnterPostalCode: (code: string) => void
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ onEnterPostalCode }) => {
  return (
    <div className={styles.deliveryInfo}>
      <div className={styles.infoItem}>
        <FaTruck className={styles.icon} />
        <div className={styles.content}>
          <h3>Free Delivery</h3>
          <input
            type="text"
            placeholder="Enter your postal code for Delivery Availability"
            onChange={e => onEnterPostalCode(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.infoItem}>
        <FaExchangeAlt className={styles.icon} />
        <div className={styles.content}>
          <h3>Return Delivery</h3>
          <p>
            Free 30 Days Delivery Returns. <span className={styles.details}>Details</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeliveryInfo
