import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdCloseFullscreen } from 'react-icons/md'

import { Media } from '../../../../Media'

import classes from './index.module.scss'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const ChatInput: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            className={classes.searchTerm}
            placeholder="Talk to us"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div>
        <div className={classes.mostsearched}>
          <ul>
            <li>Am Interested In Your Products</li>
            <li>Hello</li>
            <li>What is the price for... </li>
            <li>Where are You Located</li>
            <li>I want to make an order</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
