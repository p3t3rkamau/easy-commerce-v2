import React from 'react'

import ArchiveBlock from './Archive'
import BottomNavBar from './BottomNavBar'
import ChatInput from './ChatInput'
import DocsInput from './DocsInput'
import HeaderInterface from './HeaderInterface'
import HeroComponent from './HeroComponent'
import HeroContent from './HeroContents'
import MessagePrompt from './MessagePrompt'
import NoMessage from './NoMessege'
import SearchBar from './Search/searchBar'
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
  function onsearch(query: string): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className={styles.container}>
      {/* <HeaderInterface onClose={onClose} /> */}
      <TopNavBar onClose={onClose} />
      <div className={styles.messageContainer}>
        <div className={styles.searchBar}>
          <HeroComponent />
          <HeroContent />
          <StatusBar status="All Systems Operational" updatedAt="May 28, 10:59 UTC" />
          {/* <StatusBar status="Systems Down" updatedAt="May 28, 11:15 UTC" /> */}
          <MessagePrompt />
          <SearchBar onSearch={onsearch} />
          <ArchiveBlock />
          <ChatInput onSearch={onsearch} />
          <NoMessage />
          <DocsInput onSearch={onsearch} />
        </div>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default ChatInterface
