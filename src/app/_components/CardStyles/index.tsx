import React from 'react'

import classes from './index.module.scss'
const CardStyles = () => {
  return (
    <div>
      <div className={classes.gridCcontainer}>
        <div className={`${classes.card} ${classes.card1}`}></div>
        <div className={`${classes.card} ${classes.card2}`}></div>
        <div className={`${classes.card} ${classes.card3}`}></div>
        <div className={`${classes.card} ${classes.card4}`}></div>
      </div>
    </div>
  )
}

export default CardStyles
