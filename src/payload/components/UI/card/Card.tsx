import React from 'react'

import classes from './Card.module.scss'

// Define the type for props
interface CardProps {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = props => {
  return <div className={classes.card}>{props.children}</div>
}

export default Card
