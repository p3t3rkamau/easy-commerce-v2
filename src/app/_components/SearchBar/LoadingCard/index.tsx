import React from 'react'
import classNames from 'classnames'

import classes from './index.module.scss'

interface CardProps {
  imageUrl: string
  loading?: boolean
}

const LoadingCard: React.FC<CardProps> = ({ loading = true }) => {
  return (
    <div className={classes.container}>
      <div className={classNames(classes.card, { [classes.loading]: loading })}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <div className={classes.content}>
          <p className={classNames(classes.description, classes.description1)}></p>
          <p className={classNames(classes.description, classes.description2)}></p>
          <p className={classNames(classes.description, classes.description3)}></p>
        </div>
      </div>
      <div className={classNames(classes.card, { [classes.loading]: loading })}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <div className={classes.content}>
          <p className={classNames(classes.description, classes.description1)}></p>
          <p className={classNames(classes.description, classes.description2)}></p>
          <p className={classNames(classes.description, classes.description3)}></p>
        </div>
      </div>
      <div className={classNames(classes.card, { [classes.loading]: loading })}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <div className={classes.content}>
          <p className={classNames(classes.description, classes.description1)}></p>
          <p className={classNames(classes.description, classes.description2)}></p>
          <p className={classNames(classes.description, classes.description3)}></p>
        </div>
      </div>
      <div className={classNames(classes.card, { [classes.loading]: loading })}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <div className={classes.content}>
          <p className={classNames(classes.description, classes.description1)}></p>
          <p className={classNames(classes.description, classes.description2)}></p>
          <p className={classNames(classes.description, classes.description3)}></p>
        </div>
      </div>
    </div>
  )
}

export default LoadingCard
