import React from 'react'
import Image from 'next/image'
import { Media, Page } from '../../../payload/payload-types'
import styles from './index.module.scss'
import { CMSLink } from '../Link'

type Props = Extract<Page['layout'][0], { blockType: 'promo-banners' }>

export const PromoBanner: React.FC<Props> = (props) => {
  const {
    discountPercentage,
   
    productTitle,
    productDescription,
    originalPrice,
    discountedPrice,
    link,
    productImage,
  } = props

  return (
    <div className={styles.promoBanner}>
      <div className={styles.discountSection}>
        <span className={styles.discountPercentage}>{discountPercentage}%</span>
        <span className={styles.discountText}>DISCOUNT</span>
        <span className={styles.limitedStock}>Limited Stock Only</span>
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{productTitle}</h2>
        <p className={styles.productDescription}>{productDescription}</p>
      </div>
      <div className={styles.priceSection}>
        <span className={styles.originalPrice}>Ksh{originalPrice.toFixed(2)}</span>
        <span className={styles.discountedPrice}>Ksh{discountedPrice.toFixed(2)}</span>
        <CMSLink className={styles.link} {...link} />
      </div>

      <Image
        width={300}
        height={300}
        src={productImage?.media.imagekit.url as Media}
        alt={productTitle}
        className={styles.productImage}
      />
    </div>
  )
}