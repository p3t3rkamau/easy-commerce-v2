'use client'

import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

const ConfettiEffect: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true) // Trigger the confetti effect when the component mounts
    const timer = setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
    return () => clearTimeout(timer) // Cleanup the timer on unmount
  }, [])

  return showConfetti ? <Confetti /> : null
}

export default ConfettiEffect
