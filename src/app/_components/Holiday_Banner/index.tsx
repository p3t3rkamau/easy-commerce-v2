import React from 'react'
import { Page } from '../../../payload/payload-types'
import styles from './index.module.scss'
import { Media } from '../Media'
import RichText from '../RichText'

type BannerProps = {
  title: string
  richText: {
    [k: string]: unknown
  }[]
  image: string | Media
  BackgroundColor: string
  id?: string | null
}

type Props = Extract<Page['layout'][0], { blockType: 'holiday-banners' }>

const Banner: React.FC<BannerProps> = ({
  title,
  richText,
  image,
  BackgroundColor,
}) => (
  <div className={styles.banner} style={{ backgroundColor: BackgroundColor }}>
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      <RichText content={richText} />
    </div>
    <div className={styles.mediaContainer}>
      <Media resource={image} imgClassName={styles.image} />
    </div>
  </div>
)

export const HolidayBanners: React.FC<Props> = ({ HolidayBanners }) => {
  if (!HolidayBanners) return null

  return (
    <div className={styles.container}>
      {HolidayBanners.map((banner, index) => (
        <Banner key={banner.id || index} {...banner} />
      ))}
    </div>
  )
}