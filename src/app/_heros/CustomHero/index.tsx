import React from 'react'
import NextImage, { StaticImageData } from 'next/image'

import { Media as MediaType, Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import ContentSlider from '../../_components/HeroButton'
import { CMSLink } from '../../_components/Link'
import { Media as MediaComponent } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const CustomHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  const imageUrl = getImageUrl(media)

  return (
    <section className={classes.hero}>
      <div className={classes.heroWrapper}>
        {imageUrl && (
          <NextImage
            src={imageUrl}
            alt="Hero Image"
            height={884}
            width={1500}
            className={classes.heroImage}
          />
        )}
        <div className={classes.buttonContent}>
          <ContentSlider />
        </div>

        {/* <div className={classes.heroTextBox}>
          <RichText content={richText} />

          {Array.isArray(links) && links.length > 0 && (
            <ul className={classes.links}>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </section>
  )
}

const getImageUrl = (media: Page['hero']['media']): string | undefined => {
  if (!media || typeof media === 'string') {
    return undefined
  }

  const imagekitUrl = media?.imagekit?.url
  // console.log(imagekitUrl)

  return imagekitUrl || undefined
}
