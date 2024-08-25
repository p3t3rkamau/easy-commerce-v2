import React, { useEffect, useState } from 'react'

import styles from './index.module.scss' // Import SCSS styles

interface ToastProps {
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // Delay removal to allow exit animation
    }, 3000) // Display toast for 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      {message}
      <button className={styles.toastClose} onClick={onClose}>
        ×
      </button>
    </div>
  )
}

export default Toast
