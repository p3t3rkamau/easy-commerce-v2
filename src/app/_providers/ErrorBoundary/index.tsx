'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import ErrorPage from '../../_components/ErrorPage'
import { useToast } from '../Toast/ToastContext'

import styles from './ErrorBoundary.module.scss' // Assuming you have a CSS module for styling

interface ErrorBoundaryProps {
  children: ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const addToast = useToast()?.addToast

  useEffect(() => {
    const handleError = (error: Error) => {
      setHasError(true)

      if (addToast) {
        addToast(`Error: ${error.message}`, 'error')
      }

      // Optionally log the error to an error reporting service here
      console.error('ErrorBoundary caught an error:', error)

      // Attempt to reload the page after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 3000) // Reload after 5 seconds
    }

    // Event listeners for global error handling
    window.addEventListener('error', event => handleError(event.error))
    window.addEventListener('unhandledrejection', event => handleError(event.reason))

    return () => {
      window.removeEventListener('error', event => handleError(event.error))
      window.removeEventListener('unhandledrejection', event => handleError(event.reason))
    }
  }, [addToast])

  if (hasError) {
    return (
      <div className={styles.errorPage}>
        <ErrorPage />
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
