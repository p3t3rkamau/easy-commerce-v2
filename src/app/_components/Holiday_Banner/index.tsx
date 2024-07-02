import React from 'react'

import styles from './index.module.scss'

interface BannerProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  backgroundColor: string
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  backgroundColor,
}) => (
  <div className={styles.banner} style={{ backgroundColor }}>
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
    <img src={imageSrc} alt={imageAlt} className={styles.image} />
  </div>
)

const HolidayBanners: React.FC = () => {
  return (
    <div className={styles.container}>
      <Banner
        title="CHRISTMAS WREATHS"
        subtitle="Join into our reward scheme to earn 5% Cash back everytime you shop"
        imageSrc="/home-carousel/hero-1.png"
        imageAlt="Christmas Wreath"
        backgroundColor="#e0eadf"
      />
      <Banner
        title="Colletible Gift for Everyone"
        subtitle="100+ unique & special products just landing in our store. Discover now!"
        imageSrc="/home-carousel/hero-2.png"
        imageAlt="Gift Train"
        backgroundColor="#d9534f"
      />
    </div>
  )
}

export default HolidayBanners
