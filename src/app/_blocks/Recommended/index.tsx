'use client'

import React from 'react'
import Carousel from 'react-grid-carousel'
import Link from 'next/link'

import { Page, Product } from '../../../payload/payload-types'
import { Chevron } from '../../_components/Chevron'

import classes from './index.module.scss'

type RecommendedBlock = Extract<Page['layout'][number], { blockType: 'recommended' }>

const RecommededArchive: React.FC<RecommendedBlock & { className?: string }> = props => {
  const { selectedDocs, className } = props

  // Type guard function to check if a doc is a Product
  function isProduct(doc: any): doc is Product {
    return typeof doc === 'object' && 'id' in doc
  }

  // Filter out invalid docs using the type guard
  const validDocs = selectedDocs?.filter(isProduct) || []

  return (
    <div className={classes.rowWrapper}>
      <div className={classes.container}>
        <div className={classes.rowHead}>
          <div
            className={`${classes.headerContainer} ${className}`}
            style={{ backgroundColor: 'wheat', color: 'black' }}
          >
            <div>Recommended</div>
            <div className={classes.seeAll}>
              <div>See All </div>
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
            arrowRight={<span className={`${classes.arrowBtn} ${classes.right}`} />}
            arrowLeft={<span className={`${classes.arrowBtn} ${classes.left}`} />}
          >
            {validDocs.map((product, index) => (
              <Carousel.Item key={index}>
                <Link href={`/products/${product.slug}`} passHref>
                  <div className={classes.cardContainer}>
                    <div
                      className={classes.img}
                      style={{ backgroundImage: `url(${product?.meta?.image?.imagekit.url})` }}
                    />
                    <div className={classes.title}>{product.title}</div>
                    <div className={classes.star}>★★★★★</div>
                    <div className={classes.price}>
                      Ksh <span>{product.price}</span>
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

export default RecommededArchive
