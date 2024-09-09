import React from 'react'

import classes from './index.module.scss'

const Loader = () => {
  return (
    <div>
      <div className={classes.loaderOverlay}>
        <div className={classes.loader}></div>
      </div>
    </div>
  )
}

export default Loader
