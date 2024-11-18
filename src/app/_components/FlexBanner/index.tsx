'use client'

import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type FlexBannerProps = Extract<Page['layout'][0], { blockType: 'FlexBanner' }> & {
  id?: string
}

export const FlexBanner: React.FC<FlexBannerProps> = props => {
  const { FlexBanners } = props

  return (
    <div className={classes.flexBanner}>
      <div className={classes.flexContainer}>
        {FlexBanners?.HorizontalBanners?.map((banner, index) => (
          <Gutter key={banner.id || index}>
            <div className={classes.bannerContainer}>
              <div className={classes.imageContainer}>
                <Media resource={banner.media} imgClassName={classes.mainImage} />
                <div className={classes.overlay}></div>
                <div className={classes.contentContainer}>
                  <RichText content={banner.richText} />

                  {banner.links?.length > 0 && (
                    <div className={classes.links}>
                      {banner.links.map((linkItem, linkIndex) => (
                        <CMSLink
                          key={linkItem.id || linkIndex}
                          type={linkItem.link.type}
                          url={linkItem.link.url}
                          newTab={linkItem.link.newTab}
                          reference={linkItem.link.reference}
                          label={linkItem.link.label}
                          appearance={linkItem.link.appearance}
                          className={classes.link}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Gutter>
        ))}
      </div>
    </div>
  )
}

export default FlexBanner
