import React, { useEffect, useState } from 'react'

import styles from './index.module.scss' // Import SCSS styles

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  action?: {
    label: string
    onClick: () => void
  } // Add action prop
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, action }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // Delay removal to allow exit animation
    }, 10000) // Display toast for 10 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.show : ''}`}>
      <div className={styles.message}>{message}</div>
      {action && (
        <button className={styles.toastAction} onClick={action.onClick}>
          {action.label}
        </button>
      )}
      <button className={styles.toastClose} onClick={onClose}>
        ×
      </button>
    </div>
  )
}

export default Toast
