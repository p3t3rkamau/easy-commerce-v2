import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../Button'

import classes from './index.module.scss'

const FlexBanner: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imageSlider}>
        <div className={classes.imageContainer}>
          <Image
            src="/assets/images/image-4.svg"
            className={classes.mainImage}
            alt="Holiday Prep"
            width={600}
            height={600}
          />
          <div className={classes.overlay}></div>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>
            <span>Holiday Prep</span>
          </div>
          <div className={classes.subTitle}>
            <span className={classes.text}>Find it all now and don't miss out</span>
          </div>
          <div className={classes.heroButton}>
            <Button el="link" href="/products" label="Shop Now" appearance="secondary" />
          </div>
        </div>
      </div>

      <div className={classes.imageSlider}>
        <div className={classes.imageContainer}>
          <Image
            src="/assets/images/image-3.svg"
            className={classes.mainImage}
            alt="Holiday Prep"
            width={600}
            height={600}
          />
          <div className={classes.overlay}></div>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>
            <span>Holiday Prep</span>
          </div>
          <div className={classes.subTitle}>
            <span className={classes.text}>Find it all now and don't miss out</span>
          </div>
          <div className={classes.heroButton}>
            <Button el="link" href="/products" label="Explore" appearance="secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlexBanner
