import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import classes from './index.module.scss'

const EventHero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imageSlider}>
        <div className={classes.imageContainer}>
          <img src="/assets/images/image-4.svg" className={classes.mainImage} alt="Holiday Prep" />
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>
            <span>Holiday Prep</span>
          </div>
          <div className={classes.subTitle}>
            <span className={classes.text}>Find it all now and don't miss out</span>
          </div>
          <div className={classes.heroButton}>
            <button>Shop Now</button>
          </div>
        </div>
        <div className={classes.controllers}>
          <div className={classes.iconWrapper}>
            <FaChevronLeft className={classes.icon} />
            <FaChevronRight className={classes.icon} />
          </div>
        </div>
      </div>
      <div className={classes.portraitImage}>
        <div className={classes.mainPortraitImage}>
          <img
            src="/assets/images/image-3.svg"
            className={classes.centerImage}
            alt="Christmas Holiday"
          />
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.mainTitle}>
            <span>Christmas Holiday</span>
          </div>
          <div className={classes.subTitle}>
            <span className={classes.text}>Find it all now and don't miss out</span>
          </div>
        </div>
      </div>
      <div className={classes.columnImageFlex}>
        <div className={classes.columnImage}>
          <div className={classes.containerFlex}>
            <img src="/assets/images/image-1.svg" className={classes.image} alt="Golden Gnome" />
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
            <img src="/assets/images/image-2.svg" className={classes.image} alt="25% Sales Off" />
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
