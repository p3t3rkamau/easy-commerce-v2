import React from 'react'

import ProductCard from '../../_components/ChatwidgetComponent/_components/ChatInterface/ProductCard'
import { Chevron } from '../../_components/Chevron'

import classes from './index.module.scss'
export const Recommended: React.FC<{
  page: number
  totalPages: number
  onClick: (page: number) => void
  className?: string
}> = props => {
  const { page, totalPages, onClick, className } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div>Recommended For You</div>
        <div className={classes.seeAll}>
          <div>See All </div>
          <div>
            <span className={classes.arrow}>&#8594;</span>
          </div>
        </div>
      </div>
      <div className={classes.ButtonContainer}>
        <div className={classes.btn1}>
          <button
            // type="button"
            className={classes.button}
            // disabled={!hasPrevPage}
            // onClick={() => {
            //   onClick(page - 1)
            // }}
          >
            <Chevron rotate={90} className={classes.icon} />
          </button>
        </div>
      </div>
      <div>
        <div className={classes.flex}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className={classes.ButtonContainer}>
        <div className={classes.btn2}>
          <button
            // type="button"
            className={classes.button}
            // disabled={!hasNextPage}
            // onClick={() => {
            //   onClick(page + 1)
            // }}
          >
            <Chevron rotate={-90} className={classes.icon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Recommended
