import React, { useState } from 'react'

import BottomNavBar from './BottomNavBar'
import ChatBlock from './ChatBlock'
import ChatInput from './ChatInput'
import DocsInput from './DocsInput'
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
  const [activeView, setActiveView] = useState('home')

  const onSearch = (query: string) => {
    // Implement search logic here
    console.log('Search query:', query)
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <HeroComponent />
            <HeroContent />
            <StatusBar />
            <MessagePrompt setActiveView={setActiveView} />
            <SearchBar />
          </>
        )
      case 'messages':
        return (
          <>
            {/* <ArchiveBlock /> */}
            <ChatBlock />
            {/* <NoMessage /> */}
            <ChatInput />
          </>
        )
      case 'help':
        return <DocsInput onSearch={onSearch} />
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <TopNavBar onClose={onClose} />
      <div className={styles.messageContainer}>
        <div className={styles.searchBar}>{renderActiveView()}</div>
      </div>
      <BottomNavBar setActiveView={setActiveView} />
    </div>
  )
}

export default ChatInterface
