import React from 'react'
import Image from 'next/image'

import styles from './index.module.scss'

const PromoBanner = () => {
  return (
    <div className={styles.promoBanner}>
      <div className={styles.discountSection}>
        <span className={styles.discountPercentage}>20%</span>
        <span className={styles.discountText}>DISCOUNT</span>
        <span className={styles.limitedStock}>Limited Stock Only</span>
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>SET 10 CYLINDRICAL CHRISTMAS GIFT BOX PACKAGING</h2>
        <p className={styles.productDescription}>
          Set 10 cylindrical christmas gift box packaging. Help you save time for prepare gift boxes
        </p>
      </div>
      <div className={styles.priceSection}>
        <span className={styles.originalPrice}>$160.50</span>
        <span className={styles.discountedPrice}>$89.99</span>
        <button className={styles.shopNowButton}>Shop Now</button>
      </div>

      <img
        width={300}
        height={300}
        src="/home-carousel/hero-1.png"
        alt="Christmas Gift Boxes"
        className={styles.productImage}
      />
    </div>
  )
}

export default PromoBanner
