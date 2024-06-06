import React, { useState } from 'react'

import './index.scss' // Assuming you have some CSS styles

const MessageInterface = ({ field }) => {
  const [messages, setMessages] = useState([])

  const handleSendMessage = message => {
    setMessages([...messages, { sender: 'Customer', text: message }])
  }

  return (
    <div className="message-interface">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input type="text" placeholder="Type a message..." />
        <button onClick={() => handleSendMessage('Sample message')}>Send</button>
      </div>
    </div>
  )
}

export default MessageInterface
// TODO: incoporate this https://github.com/yourjhay/simple-chat/tree/master?tab=readme-ov-file or https://shadcn-chat.vercel.app/