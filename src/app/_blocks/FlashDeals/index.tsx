'use client'

import React, { useEffect, useState } from 'react'
import Carousel from 'react-grid-carousel'
import Link from 'next/link'

import { Page, Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

type FlashDealsBlock = Extract<Page['layout'][number], { blockType: 'flash-sales' }>

const FlashDealsArchive: React.FC<FlashDealsBlock & { className?: string }> = props => {
  const { Heading, BackgroundColor, TextColor, selectedDocs, className } = props

  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const fetchFlashSaleTimes = async () => {
      // Replace this with actual fetch from your database
      const startTime = new Date('2024-06-17T12:00:00Z')
      const endTime = new Date('2024-06-17T18:00:00Z')

      const updateRemainingTime = () => {
        const now = new Date()
        const timeDiff = endTime.getTime() - now.getTime()
        if (timeDiff > 0) {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60))
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
          setTimeRemaining(`${hours}H:${minutes}M:${seconds}S`)
        } else {
          setTimeRemaining('Sale Ended')
        }
      }

      updateRemainingTime()
      const interval = setInterval(updateRemainingTime, 1000)

      return () => clearInterval(interval)
    }

    fetchFlashSaleTimes()
  }, [])

  function isProduct(doc: any): doc is Product {
    return typeof doc === 'object' && 'id' in doc
  }

  const validDocs = selectedDocs?.filter(isProduct) || []
  return (
    <div className={`${classes.rowWrapper}`}>
      <div className={classes.container}>
        <div
          className={`${classes.rowHead} ${className}`}
          style={{ backgroundColor: BackgroundColor, color: TextColor }}
        >
          <div>{Heading}</div>
          <div>
            <span>
              Time Left: <span className={classes.bold}>{timeRemaining}</span>
            </span>
          </div>
          <div className={classes.seeAll}>
            <div>See All</div>
            <div>
              <span className={classes.arrow}>&#8594;</span>
            </div>
          </div>
        </div>
        <div className={classes.row}>
          <Carousel
            cols={5}
            rows={1}
            gap={10}
            loop
            showDots
            responsiveLayout={[
              { breakpoint: 1920, cols: 8 },
              { breakpoint: 1500, cols: 5, loop: true },
              { breakpoint: 990, cols: 3 },
              { breakpoint: 670, cols: 2 },
              { breakpoint: 400, cols: 2 },
            ]}
            mobileBreakpoint={400}
            arrowRight={<span className={`${classes.arrowBtn} ${classes.right}`} />}
            arrowLeft={<span className={`${classes.arrowBtn} ${classes.left}`} />}
          >
            {validDocs.map((product, index) => {
              const totalUnits = 100
              const unitsLeft = Math.floor(Math.random() * totalUnits)
              const percentageLeft = (unitsLeft / totalUnits) * 100

              return (
                <Carousel.Item key={index}>
                  <Link href={`/products/${product.slug}`} passHref>
                    <div className={classes.cardContainer}>
                      <div
                        className={classes.img}
                        style={{ backgroundImage: `url(${product?.meta?.image?.imagekit.url})` }}
                      />
                      <div className={classes.title}>{product.title}</div>
                      <div className={classes.price}>
                        USD <span>{product.price}</span>
                      </div>
                      <div className={classes.progressBar}>
                        <div style={{ width: `${percentageLeft}%` }} />
                      </div>
                      <div className={classes.unitsLeft}>{unitsLeft} units left</div>
                    </div>
                  </Link>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default FlashDealsArchive
