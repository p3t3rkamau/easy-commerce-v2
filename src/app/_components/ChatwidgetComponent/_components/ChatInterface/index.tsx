import React from 'react'

import SearchBar from '../../../SearchBar/searchBar'
import BottomNavBar from './BottomNavBar'
import HeaderInterface from './HeaderInterface'
import HeroComponent from './HeroComponent'
import HeroContent from './HeroContents'
import StatusBar from './StatusBar'
import TopNavBar from './TopNavbar'

import styles from './index.module.scss'

export interface Message {
  sender: 'bot' | 'user'
  text: string
}

interface ChatInterfaceProps {
  onClose: () => void
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  return (
    <div className={styles.container}>
      {/* <HeaderInterface onClose={onClose} /> */}
      <TopNavBar onClose={onClose} />
      <div className={styles.messageContainer}>
        <div className={styles.searchBar}>
          <SearchBar />
          <HeroComponent />
          <HeroContent />
          <StatusBar status="All Systems Operational" updatedAt="May 28, 10:59 UTC" />
          {/* <StatusBar status="Systems Down" updatedAt="May 28, 11:15 UTC" /> */}
        </div>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default ChatInterface
