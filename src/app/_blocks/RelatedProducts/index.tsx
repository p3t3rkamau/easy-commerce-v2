import React from 'react'

import { Product } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'

import classes from './index.module.scss'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { docs, relationTo } = props

  // Function to shuffle array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Randomly select six products
  const shuffledProducts = shuffleArray(docs?.filter(doc => typeof doc !== 'string'))
  const randomProducts = shuffledProducts?.slice(0, 6)

  return (
    <>
      <div className={classes.relatedProducts}>
        <Gutter>
          <h3 className={classes.title}>Related Products</h3>
          <div className={classes.grid}>
            {docs?.map(doc => {
              if (typeof doc === 'string') return null

              return <Card key={doc.id} relationTo={relationTo} doc={doc} showCategories />
            })}
          </div>
        </Gutter>
      </div>
      <div className={classes.relatedProducts}>
        <Gutter>
          <h3 className={classes.title}>You May Also Like</h3>
          <div className={classes.grid}>
            {randomProducts?.map(doc => (
              <Card key={doc.id} relationTo={relationTo} doc={doc} showCategories />
            ))}
          </div>
        </Gutter>
      </div>
    </>
  )
}
