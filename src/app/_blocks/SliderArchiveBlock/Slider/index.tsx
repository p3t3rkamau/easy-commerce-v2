import React from 'react'

import { Product } from '../../../../payload/payload-types'
import { Card } from '../../../_components/Card'

import classes from '../index.module.scss'

interface SliderArchiveProps {
  selectedDocs?: Product[]
  newTag?: boolean
}

const SliderArchive: React.FC<SliderArchiveProps> = ({ selectedDocs, newTag }) => {
  return (
    <div className={classes.flex}>
      {selectedDocs?.map((product, index) => (
        <Card key={index} relationTo="products" doc={product} showCategories newTag={newTag} />
      ))}
    </div>
  )
}

export default SliderArchive
