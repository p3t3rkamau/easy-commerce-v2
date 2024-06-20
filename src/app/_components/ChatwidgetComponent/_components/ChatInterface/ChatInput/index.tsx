import React, { useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'
import io from 'socket.io-client'

import classes from './index.module.scss'

const socket = io('http://localhost:3000', {
  path: '/api/socket',
})

const ChatInput = () => {
  const [query, setQuery] = useState('')
  const [selectedAPI, setSelectedAPI] = useState('chatbot') // Default API
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (selectedAPI === 'socket') {
      const name = prompt('What is your name?')
      if (name) {
        socket.emit('new-user', name)
      }

      socket.on('chat-message', (data: { name: string; message: string }) => {
        setMessages(prevMessages => [...prevMessages, `${data.name}: ${data.message}`])
      })

      socket.on('user-connected', (name: string) => {
        setMessages(prevMessages => [...prevMessages, `${name} connected`])
      })

      socket.on('user-disconnected', (name: string) => {
        setMessages(prevMessages => [...prevMessages, `${name} disconnected`])
      })

      return () => {
        socket.off('chat-message')
        socket.off('user-connected')
        socket.off('user-disconnected')
      }
    }
  }, [selectedAPI])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await sendMessage(query)
      setQuery('')
    }
  }

  const sendMessage = async (message: string) => {
    if (selectedAPI === 'socket') {
      setMessages(prevMessages => [...prevMessages, `You: ${message}`])
      socket.emit('send-chat-message', message)
    } else {
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
  }

  const handleAPIChange = (api: string) => {
    setSelectedAPI(api)
    setMessages([]) // Clear messages when changing API
  }

  return (
    <div className={classes.container}>
      <div className={classes.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={classes.message}>
            {msg}
          </div>
        ))}
      </div>
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
          <span className={classes.searchIcon} onClick={() => sendMessage(query)}>
            <IoMdSend />
          </span>
        </div>
      </div>
      <div>
        <div className={classes.mostsearched}>
          <ul>
            <li onClick={() => setQuery('I am interested in your products')}>
              I am interested in your products
            </li>
            <li onClick={() => setQuery('I want to make an order')}>I want to make an order</li>
          </ul>
        </div>
      </div>
      <div className={classes.apiSelector}>
        <button onClick={() => handleAPIChange('chatbot')}>Chatbot</button>
        <button onClick={() => handleAPIChange('openai')}>OpenAI</button>
        <button onClick={() => handleAPIChange('whatsapp')}>WhatsApp</button>
        <button onClick={() => handleAPIChange('socket')}>Socket.IO</button>
      </div>
    </div>
  )
}

export default ChatInput
