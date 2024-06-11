import React, { useState } from 'react'

import { generateReceipt } from './index'

const CustomOrderReceiptButton = ({ order }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerateReceipt = async () => {
    setIsGenerating(true)
    try {
      await generateReceipt(order)
      console.log('Receipt generated successfully')
      // Optionally, you can provide additional feedback to the user
    } catch (error) {
      console.error('Error generating receipt:', error)
      setError('Error generating receipt. Please try again.')
    }
    setIsGenerating(false)
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: error ? 'red' : '#952a96',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          outline: 'none',
        }}
        disabled={isGenerating}
        onClick={handleGenerateReceipt}
      >
        {isGenerating ? 'Generating...' : error ? 'Error' : 'Generate Receipt'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
      <button
        style={{
          backgroundColor: '#952a96',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          outline: 'none',
          margin: '0 20px',
        }}
      >
        Share{' '}
      </button>
    </div>
  )
}

export default CustomOrderReceiptButton
