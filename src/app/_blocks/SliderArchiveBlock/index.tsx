import React from 'react'

import { Page, Product } from '../../../payload/payload-types'
import SliderArchive from './Slider'

import classes from './index.module.scss'

type ProductSliderBlock = Extract<Page['layout'][number], { blockType: 'products-slider' }>

const SliderArchiveBlock: React.FC<ProductSliderBlock & { className?: string }> = props => {
  const { Heading, BackgroundColor, TextColor, NewTag, selectedDocs, className, id } = props
  function isProduct(doc: string | Product): doc is Product {
    return typeof doc === 'object' && 'id' in doc
  }
  // Use type guard to filter out invalid docs
  const validDocs = selectedDocs?.map(doc => doc).filter(isProduct) || []

  return (
    <div
      id={id}
      className={`${classes.container} ${className}`}
      style={{ backgroundColor: BackgroundColor, color: TextColor }}
    >
      <div className={classes.headerContainer}>
        <div>{Heading}</div>
        <div className={classes.seeAll}>
          <div>See All </div>
          <div>
            <span className={classes.arrow}>&#8594;</span>
          </div>
        </div>
      </div>
      <SliderArchive selectedDocs={validDocs} />
    </div>
  )
}

export default SliderArchiveBlock
