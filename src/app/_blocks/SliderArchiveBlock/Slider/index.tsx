import React from 'react'

import { Product } from '../../../../payload/payload-types'
import { Card } from '../../../_components/Card'

import classes from '../index.module.scss'

interface SliderArchiveProps {
  selectedDocs?: Product[]
}

const SliderArchive: React.FC<SliderArchiveProps> = ({ selectedDocs }) => {
  return (
    <div className={classes.sliderArchive}>
      {selectedDocs.map((product, index) => (
        <Card key={index} relationTo="products" doc={product} showCategories />
      ))}
    </div>
  )
}

export default SliderArchive
