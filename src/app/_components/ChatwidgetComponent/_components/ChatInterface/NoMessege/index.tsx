import React from 'react'
import { MdOutlineMessage } from 'react-icons/md'

import classes from './index.module.scss'
const NoMessage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.messageIcon}>
        <MdOutlineMessage />
      </div>
      <div> No Messages</div>
    </div>
  )
}

export default NoMessage
