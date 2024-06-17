import React from 'react'

import { Media } from '../../_components/Media'

import classes from './index.module.scss'
const GridBlock = () => {
  return (
    <div>
      <div className={classes.Container}>
        <div className={classes.gridBlock}>
          <div className={classes.grid}>
            <div className={classes.Block1}>
              <Media resource="" imgClassName={classes.Image} />
              <div>
                <span>Hello world</span>
              </div>
            </div>
          </div>
          <div className={classes.gridColumn}>
            <div className={classes.Block2}>
              {' '}
              <Media resource="" imgClassName={classes.Image} />
              <div>
                <span>Hello world</span>
              </div>
            </div>
            <div className={classes.Block3}>
              {' '}
              <Media resource="" imgClassName={classes.Image} />
              <div>
                <span>Hello world</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GridBlock
