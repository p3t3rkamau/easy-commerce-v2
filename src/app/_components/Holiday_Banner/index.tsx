import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Media } from '../Media'
import RichText from '../RichText'

import styles from './index.module.scss'

type BannerProps = Extract<Page['layout'][0], { blockType: 'holiday-banners' }>

export const HolidayBannersComponent: React.FC<
  BannerProps & {
    id?: string
    title: string
    BackgroundColor: string
    richText: { [k: string]: unknown }[] // Adjusted to match the schema
    image: string | Media
    HolidayBanners: string
  }
> = ({ title, BackgroundColor, richText, image, HolidayBanners }) => {
  return (
    <div className={styles.banner} style={{ backgroundColor: BackgroundColor }}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <RichText content={richText} />
      </div>
      <div className={styles.mediaContainer}>
        {typeof image === 'string' ? (
          <Media resource={image} imgClassName={styles.image} />
        ) : (
          <Media resource={image.url} imgClassName={styles.image} />
        )}
      </div>
    </div>
  )
}
