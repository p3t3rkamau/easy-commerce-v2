'use client'

import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import NextImage from 'next/image'

import { Media, Page } from '../../../payload/payload-types'
import ContentSlider from '../../_components/HeroButton'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const EventHero: React.FC<Page['heroImage']> = ({
  SliderHero,
  PotraitImage,
  SideImages,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? SliderHero?.SliderImages.length - 1 : prevIndex - 1,
    )
  }

  const handleNext = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === SliderHero?.SliderImages.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const getImageUrl = (media: Media): string | undefined => {
    if (!media || typeof media === 'string') {
      return undefined
    }

    return media?.imagekit?.url || undefined
  }

  const imageUrl = getImageUrl(SliderHero?.SliderImages[currentImageIndex]?.media as Media)

  return (
    <section className={classes.hero}>
      <div className={classes.heroWrapper}>
        {imageUrl && (
          <NextImage
            src={imageUrl}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className={classes.heroImage}
          />
        )}
        <div className={classes.controllers}>
          <div className={classes.iconWrapper} onClick={handlePrevious}>
            <FaChevronLeft className={classes.icon} />
          </div>
          <div className={classes.iconWrapper} onClick={handleNext}>
            <FaChevronRight className={classes.icon} />
          </div>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>HOLIDAY PREP</div>
          <div className={classes.subTitle}>Find it all now and don't miss out</div>
        </div>
      </div>

      <div className={classes.portraitImage}>
        {PotraitImage?.media && (
          <NextImage
            src={getImageUrl(PotraitImage?.media as Media)}
            alt="Portrait Image"
            layout="fill"
            objectFit="cover"
            className={classes.centerImage}
          />
        )}
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>CHRISTMAS SOLIDER</div>
          <div className={classes.subTitle}>DISCOVER NOW</div>
        </div>
      </div>
      <div className={classes.columnImageFlex}>
        {SideImages?.Images?.map((sideImage, index) => (
          <div className={classes.columnImage} key={index}>
            <div className={classes.containerFlex}>
              <NextImage
                src={getImageUrl(sideImage.media as Media)}
                className={classes.images}
                alt={`Side Image ${index}`}
                height={400}
                width={600}
              />
              <div className={classes.overlay}></div>
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.mainTitle}>
                <RichText content={sideImage.richText} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EventHero
