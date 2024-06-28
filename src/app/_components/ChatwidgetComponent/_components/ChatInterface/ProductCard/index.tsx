import React from 'react'

import { Media } from '../../../../Media'

import classes from './index.module.scss'
const ProductCard = () => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.mediaWrapper}>
          <div className={classes.discount}>
            <span>-23%</span>
          </div>
          <div className={classes.new}>
            <span>new</span>
          </div>
          <Media imgClassName={classes.image} resource="/Easy-logo.svg" />
        </div>

        <div className={classes.content}>
          <span className={classes.title}>Product Title</span>
          <div className={classes.price}>
            <div className={classes.prize}>Ksh200</div>
            <div className={classes.discountedPrize}>Ksh180</div>
          </div>
          <button className={classes.AddToCartButton}>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
