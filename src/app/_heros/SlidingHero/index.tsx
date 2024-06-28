'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Media } from '../../../payload/payload-types'

import classes from './index.module.scss'

interface SlidingHeroProps {
  slidingImages: {
    media: Media | string
    title: string
    id?: string
  }[]
}

const SlidingHero: React.FC<SlidingHeroProps> = ({ slidingImages = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === slidingImages.length - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, slidingImages])

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 9000)
    return () => clearInterval(intervalRef.current as ReturnType<typeof setInterval>)
  }, [nextSlide])

  return (
    <div className={classes.SliderContainer}>
      {slidingImages.map((slider, index) => (
        <div
          className={`${classes.card} ${index === currentSlide ? classes.active : ''}`}
          key={slider.title}
        >
          {slider.media &&
            (typeof slider.media === 'string' ? (
              <Image
                src={slider.media}
                width={1300}
                height={900}
                alt={slider.title}
                className={classes.image}
                priority
              />
            ) : (
              <Image
                src={slider.media.imagekit.url}
                width={1200}
                height={800}
                alt={slider.title}
                className={classes.image}
                priority
              />
            ))}
        </div>
      ))}
      <p>Sliding Hero</p>
    </div>
  )
}

export default React.memo(SlidingHero)
