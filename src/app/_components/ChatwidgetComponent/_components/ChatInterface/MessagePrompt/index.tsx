import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

import classes from './index.module.scss'
const MessagePrompt = () => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.message}>
          <span>Send us a message</span>
          <span>We typically reply in under 5 minutes</span>
        </div>
        <div className={classes.arrowContainer}>
          <span className={classes.arrow}>
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessagePrompt
//TODO: change the icon to come from react icons
