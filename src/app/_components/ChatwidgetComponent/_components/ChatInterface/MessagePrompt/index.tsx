import React from 'react'

import './index.module.scss'
const MessagePrompt = () => {
  return (
    <div>
      <div className="container">
        <div className="message">
          <span>Send us a message</span>
          <span>We typically reply in under 5 minutes</span>
        </div>
        <div className="arrowContainer">
          <span className="arrow">&#8594;</span>
        </div>
      </div>
    </div>
  )
}

export default MessagePrompt
