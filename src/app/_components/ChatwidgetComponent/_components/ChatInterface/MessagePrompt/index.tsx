import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

import classes from './index.module.scss'

interface MessagePromptProps {
  setActiveView: (view: string) => void
}

const MessagePrompt: React.FC<MessagePromptProps> = ({ setActiveView }) => {
  return (
    <div>
      <div className={classes.container} onClick={() => setActiveView('messages')}>
        <div className={classes.message}>
          <span className={classes.send}>Send us a message</span>
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
