import React, { useState } from 'react'

// import './emails.scss' // Assuming you have some CSS styles

const EmailInterface = ({ field }) => {
  const [emails, setEmails] = useState([])

  const handleSendEmail = email => {
    setEmails([...emails, { sender: 'Customer', text: email }])
  }

  return (
    <div className="email-interface">
      <div className="emails">
        {emails.map((email, index) => (
          <div key={index} className={`email ${email.sender}`}>
            <strong>{email.sender}:</strong> {email.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input type="text" placeholder="Type an email..." />
        <button onClick={() => handleSendEmail('Sample email')}>Send</button>
      </div>
    </div>
  )
}

export default EmailInterface
// TODO: incoporate this https://codepen.io/nicklassandell/pen/rNamqz
