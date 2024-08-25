'use client'
import React, { useEffect } from 'react'

import classes from './index.module.scss' // Import your SCSS file

interface ToastProps {
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000) // Toast disappears after 3 seconds

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [onClose])

  return <div className={classes.toast}>{message}</div>
}

export default Toast
