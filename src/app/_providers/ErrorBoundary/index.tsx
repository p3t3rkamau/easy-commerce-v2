'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import { useToast } from '../Toast/ToastContext'

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

      // You can also log the error to an error reporting service here
      console.error('ErrorBoundary caught an error', error)
    }

    // Catching errors within the useEffect
    window.addEventListener('error', event => handleError(event.error))
    window.addEventListener('unhandledrejection', event => handleError(event.reason))

    return () => {
      window.removeEventListener('error', event => handleError(event.error))
      window.removeEventListener('unhandledrejection', event => handleError(event.reason))
    }
  }, [addToast])

  if (hasError) {
    return <h2>Something went wrong.</h2>
  }

  return <>{children}</>
}

export default ErrorBoundary
