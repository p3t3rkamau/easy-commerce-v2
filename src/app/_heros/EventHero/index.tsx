'use client'
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'

import { Button } from '../../_components/Button'

import classes from './index.module.scss'

const EventHero: React.FC = heroImage => {
  const images = [
    { src: '/assets/images/image-4.svg', alt: 'Holiday Prep' },
    { src: '/assets/images/image-3.svg', alt: 'Christmas Holiday' },
    { src: '/assets/images/image-1.svg', alt: 'Golden Gnome' },
    { src: '/assets/images/image-2.svg', alt: '25% Sales Off' },
  ]

  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Function to handle the previous image
  const handlePrevious = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  // Function to handle the next image
  const handleNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageSlider}>
        <div className={classes.imageContainer}>
          <Image
            src={images[currentImageIndex].src}
            className={classes.mainImage}
            alt={images[currentImageIndex].alt}
            width={600}
            height={600}
          />
          <div className={classes.overlay}></div>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>
            <span>{images[currentImageIndex].alt}</span>
          </div>
          <div className={classes.subTitle}>
            <span className={classes.text}>Find it all now and don't miss out</span>
          </div>
          <div className={classes.heroButton}>
            <Button el="link" href="/products" label="Shop" appearance="secondary" />
          </div>
        </div>
        <div className={classes.controllers}>
          <div className={classes.iconWrapper} onClick={handlePrevious}>
            <FaChevronLeft className={classes.icon} />
          </div>
          <div className={classes.iconWrapper} onClick={handleNext}>
            <FaChevronRight className={classes.icon} />
          </div>
        </div>
      </div>

      <div className={classes.portraitImage}>
        <div className={classes.mainPortraitImage}>
          <Image
            src="/assets/images/image-3.svg"
            className={classes.centerImage}
            alt="Christmas Holiday"
            width={600}
            height={600}
          />
          <div className={classes.overlay}></div>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>
            <span>Christmas Holiday</span>
          </div>
          <div className={classes.subTitle}>
            <span className={classes.text}>Discover Now</span>
          </div>
        </div>
      </div>

      <div className={classes.columnImageFlex}>
        <div className={classes.columnImage}>
          <div className={classes.containerFlex}>
            <Image
              src="/assets/images/image-1.svg"
              className={classes.images}
              alt="Golden Gnome"
              width={600}
              height={600}
            />
            <div className={classes.overlay}></div>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.mainTitle}>
              <span>Golden Gnome</span>
            </div>
            <div className={classes.subTitle}>
              <span className={classes.text}>Scavenger Hunt</span>
            </div>
          </div>
        </div>
        <div className={classes.columnImage}>
          <div className={classes.containerFlex}>
            <Image
              src="/assets/images/image-2.svg"
              className={classes.images}
              alt="25% Sales Off"
              width={600}
              height={600}
            />
            <div className={classes.overlay}></div>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.mainTitle}>
              <span>25% Sales Off</span>
            </div>
            <div className={classes.subTitle}>
              <span className={classes.text}>Stocking & Tree Skirts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHero
