'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Gutter } from '../Gutter'

import styles from './index.module.scss'

interface ClientLogo {
  src: string
  alt: string
}

const clientLogos: ClientLogo[] = [
  {
    src: 'https://ik.imagekit.io/6cga8hi9z/All_Products/my_logo_Or0OlUjAa',
    alt: 'Logo',
  },
  {
    src: 'https://ik.imagekit.io/6cga8hi9z/All_Products/my_logo_Or0OlUjAa',
    alt: 'Logo',
  },
  {
    src: 'https://ik.imagekit.io/6cga8hi9z/All_Products/my_logo_Or0OlUjAa',
    alt: 'Logo',
  },
  {
    src: 'https://ik.imagekit.io/6cga8hi9z/All_Products/my_logo_Or0OlUjAa',
    alt: 'Logo',
  },
  {
    src: 'https://ik.imagekit.io/6cga8hi9z/All_Products/my_logo_Or0OlUjAa',
    alt: 'Logo',
  },
]

const LogoSlider: React.FC = () => {
  const clientLogoRef = useRef<HTMLUListElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollWidth = useRef(0)
  const logoWidth = 220 // width of each logo
  const totalLogosWidth = logoWidth * clientLogos.length
  const speed = 0.1 // slowed down speed

  useEffect(() => {
    const animateSlider = () => {
      if (!isPaused && clientLogoRef.current) {
        scrollWidth.current -= speed
        if (Math.abs(scrollWidth.current) >= totalLogosWidth) {
          scrollWidth.current = 0
        }
        clientLogoRef.current.style.transform = `translateX(${scrollWidth.current}px)`
      }
      requestAnimationFrame(animateSlider)
    }

    animateSlider()
  }, [isPaused, totalLogosWidth, speed])

  const handleMouseEnter = () => {
    setIsPaused(true)
    if (clientLogoRef.current) {
      clientLogoRef.current.classList.add(styles.grayscale)
    }
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    if (clientLogoRef.current) {
      clientLogoRef.current.classList.remove(styles.grayscale)
    }
  }

  const handleLogoHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const logos = document.querySelectorAll(`.${styles['clients-wrap']} ul li img`)
    logos.forEach(logo => {
      if (logo !== e.currentTarget.querySelector('img')) {
        logo.style.filter = 'grayscale(100%)'
      }
    })
    e.currentTarget.querySelector('img')!.style.filter = 'none'
  }

  const handleLogoHoverLeave = () => {
    const logos = document.querySelectorAll(`.${styles['clients-wrap']} ul li img`)
    logos.forEach(logo => {
      logo.style.filter = 'none'
    })
  }

  return (
    <>
      <div className="text-center">Some Of Our Trusted Brands</div>
      <div id={styles.ourclients}>
        <div className={styles['clients-wrap']}>
          <ul
            ref={clientLogoRef}
            className="clearfix"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {clientLogos.concat(clientLogos).map((logo, index) => (
              <li key={index} onMouseEnter={handleLogoHover} onMouseLeave={handleLogoHoverLeave}>
                <img src={logo.src} alt={logo.alt} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default LogoSlider
