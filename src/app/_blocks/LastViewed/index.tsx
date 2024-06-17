'use client'
import React, { useState } from 'react'

import { Page, Product } from '../../../payload/payload-types'
import { Chevron } from '../../_components/Chevron'
import SliderArchive from './Slider'

import classes from './index.module.scss'

type LastViewedBlock = Extract<Page['layout'][number], { blockType: 'last-viewed' }>

const LastViewedArchive: React.FC<LastViewedBlock & { className?: string }> = props => {
  const { selectedDocs, className } = props
  // console.log('SliderArchiveBlock Props:', props)

  // Type guard function to check if a doc is a Product
  function isProduct(doc: any): doc is Product {
    return typeof doc === 'object' && 'id' in doc
  }

  // Filter out invalid docs using the type guard
  const validDocs = selectedDocs?.filter(isProduct) || []

  // Pagination state
  const [page, setPage] = useState(1)
  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(validDocs?.length / itemsPerPage)

  // Event handlers for next and previous buttons
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  // Get the items for the current page
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const itemsToShow = validDocs?.slice(startIndex, endIndex)

  // Log the validDocs to verify
  // console.log('Valid Products:', validDocs)
  // console.log('Items to Show:', itemsToShow)
  // console.log('Current Page:', page, 'Total Pages:', totalPages)

  return (
    <div>
      <div
        className={`${classes.headerContainer} ${className}`}
        style={{ backgroundColor: 'brown', color: 'white' }}
      >
        <div>Last Viewed</div>
        <div className={classes.seeAll}>
          <div>See All </div>
          <div>
            <span className={classes.arrow}>&#8594;</span>
          </div>
        </div>
      </div>
      <div className={classes.sliderFlex}>
        <div className={classes.ButtonContainer}>
          <button
            className={`${classes.button1} ${classes.button} ${className}`}
            onClick={handlePrev}
            disabled={page === 1}
          >
            <Chevron rotate={90} className={classes.icon} />
          </button>
        </div>
        <div className={classes.flex}>
          <SliderArchive selectedDocs={itemsToShow} />
        </div>
        <div className={classes.ButtonContainer}>
          <button
            className={`${classes.button2} ${classes.button} ${className}`}
            onClick={handleNext}
            disabled={page === totalPages}
          >
            <Chevron rotate={-90} className={classes.icon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LastViewedArchive
