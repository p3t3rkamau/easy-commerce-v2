import React from 'react'

import { Media } from '../Media'

import classes from './index.module.scss'
const FlashDealsCard = () => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.mediaWrapper}>
          <div className={classes.discount}>
            <span>-23%</span>
          </div>
          <Media imgClassName={classes.image} resource="/Easy-logo.svg" />
        </div>

        <div className={classes.content}>
          <h4 className={classes.title}>Product Title</h4>
          <div className={classes.price}>
            <div className={classes.price}>Ksh 200</div>
            <div className={classes.discountedPrize}>Ksh 180</div>
          </div>
          <div className={classes.itemsleft}>2 items left</div>
          <div className={classes.mainProgress}>
            <div className={classes.progress}></div>
          </div>
          <button className={classes.AddToCartButton}>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default FlashDealsCard
