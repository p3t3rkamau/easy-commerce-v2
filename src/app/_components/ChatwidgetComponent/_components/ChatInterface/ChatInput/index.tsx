import React, { useState } from 'react'
import axios from 'axios'

import classes from './index.module.scss'

const ChatInput = () => {
  const [query, setQuery] = useState('')
  const [selectedAPI, setSelectedAPI] = useState('chatbot') // Default API

  const handleInputChange = e => {
    setQuery(e.target.value)
  }

  const handleKeyPress = async e => {
    if (e.key === 'Enter') {
      await sendMessage(query)
      setQuery('')
    }
  }

  const sendMessage = async message => {
    try {
      let response
      if (selectedAPI === 'chatbot') {
        response = await axios.post('/api/chatbot', { message })
      } else if (selectedAPI === 'openai') {
        response = await axios.post('/api/openai', { prompt: message })
      } else if (selectedAPI === 'whatsapp') {
        response = await axios.post('/api/whatsapp', { message })
      }
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleAPIChange = api => {
    setSelectedAPI(api)
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
            <li onClick={() => setQuery('I am interested in your products')}>
              I am interested in your products
            </li>
            <li onClick={() => setQuery('Hello')}>Hello</li>
            <li onClick={() => setQuery('What is the price for...')}>What is the price for...</li>
            <li onClick={() => setQuery('Where are you located?')}>Where are you located?</li>
            <li onClick={() => setQuery('I want to make an order')}>I want to make an order</li>
          </ul>
        </div>
      </div>
      {/* <div className={classes.apiSelector}>
        <button onClick={() => handleAPIChange('chatbot')}>Chatbot</button>
        <button onClick={() => handleAPIChange('openai')}>OpenAI</button>
        <button onClick={() => handleAPIChange('whatsapp')}>WhatsApp</button>
      </div> */}
    </div>
  )
}

export default ChatInput
