'use client'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdOutlineMessage } from 'react-icons/md'

import ChatInterface from '../../ChatInterface'
import FloatingActionButton from '../FloatingActionButton'

import styles from './index.module.scss'

const ExpandableFloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showChatInterface, setShowChatInterface] = useState(false)

  const handleButtonClick = () => {
    setShowChatInterface(prevState => !prevState) // Toggle the chat interface visibility
  }

  const handleCloseChat = () => {
    setShowChatInterface(false) // Function to close the chat interface
  }

  return (
    <>
      <div>{showChatInterface ? <ChatInterface onClose={handleCloseChat} /> : null}</div>
      <div className={styles.container}>
        <div className={`${styles.fabContainer} ${isExpanded ? styles.fabContainerExpanded : ''}`}>
          <FloatingActionButton
            icon={showChatInterface ? <FaMinus /> : <MdOutlineMessage />} // Change icon based on chat state
            color="#952a96"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </>
  )
}

export default ExpandableFloatingActionButton
