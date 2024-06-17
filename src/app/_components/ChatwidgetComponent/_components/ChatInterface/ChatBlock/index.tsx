import React from 'react'

import { Media } from '../../../../Media'

import classes from './index.module.scss'

const ChatBlock = () => {
  return (
    <div className={classes.container}>
      <div className={classes.today}>
        <span className={classes.line}></span>
        <span>6/11/2024</span>
        <span className={classes.line}></span>
      </div>

      <div className={classes.messageContainer}>
        <div className={classes.botResponse}>
          <span>Hello, I am a bot. How are you?</span>
          <span className={classes.timeStamp}>9:23AM</span>
        </div>
      </div>

      <div className={classes.messageContainer}>
        <div className={classes.userResponse}>
          <span>Hello, I am a user.how are you </span>
          <span className={classes.timeStamp}>9:24AM</span>
        </div>
      </div>

      <div className={classes.messageContainer}>
        <div className={classes.botImageContainer}>
          <Media resource="" imgClassName={classes.image} />
          <span className={classes.timeStamps}>9:24AM</span>
        </div>
      </div>

      <div className={classes.messageContainer}>
        <div className={classes.userImageContainer}>
          <Media resource="" imgClassName={classes.image} />
          <span className={classes.timeStamps}>9:24AM</span>
        </div>
      </div>
    </div>
  )
}

export default ChatBlock
