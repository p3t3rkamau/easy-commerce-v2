'use client'

import React from 'react'
import Carousel from 'react-grid-carousel'
import Link from 'next/link'

import { Page, Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

type EventBlock = Extract<Page['layout'][number], { blockType: 'Event-Archive' }>

const EventArchiveBlock: React.FC<EventBlock & { className?: string }> = props => {
  const { Heading, BackgroundColor, TextColor, selectedDocs, className } = props

  // Type guard function to check if a doc is a Product
  function isProduct(doc: any): doc is Product {
    return typeof doc === 'object' && 'id' in doc
  }
  const validDocs = selectedDocs?.filter(isProduct) || []

  return (
    <div className={classes.rowWrapper}>
      <div className={classes.container}>
        <div
          className={classes.rowHead}
          style={{ backgroundColor: BackgroundColor, color: TextColor }}
        >
          <div className={`${classes.headerContainer} ${className}`}>
            <div>{Heading}</div>
            <div className={classes.seeAll}>
              <div>See All</div>
              <div>
                <span className={classes.arrow}>&#8594;</span>
              </div>
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
              {
                breakpoint: 1920,
                cols: 8,
              },
              {
                breakpoint: 1500,
                cols: 5,
                loop: true,
              },
              {
                breakpoint: 990,
                cols: 3,
              },
              {
                breakpoint: 670,
                cols: 2,
              },
              {
                breakpoint: 400,
                cols: 2,
              },
            ]}
            mobileBreakpoint={400}
            arrowRight={<span className={classes.arrowBtnRight} />}
            arrowLeft={<span className={classes.arrowBtnLeft} />}
          >
            {validDocs.map((product, index) => (
              <Carousel.Item key={index}>
                <Link href={`/products/${product.slug}`} passHref>
                  <div className={classes.cardContainer}>
                    <div
                      className={classes.img}
                      style={{
                        backgroundImage: `url(${product?.meta?.image?.imagekit.url})`,
                      }}
                    />
                    <div className={classes.title}>{product.title}</div>
                    <div className={classes.star}>★★★★★</div>
                    <div className={classes.price}>
                      USD <span>{product.price}</span>
                    </div>
                  </div>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default EventArchiveBlock
