'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import ErrorPage from '../../_components/ErrorPage'
import { useToast } from '../Toast/ToastContext'

interface ErrorBoundaryProps {
  children: ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const addToast = useToast()?.addToast

  useEffect(() => {
    const handleError = (error: Error) => {
      if (error.message.includes('ChunkLoadError')) {
        // Special handling for chunk load errors
        setHasError(true)
        addToast(`Chunk loading error: ${error.message}`, 'error')
      } else {
        // Handle other types of errors
        setHasError(true)
        addToast(`Error: ${error.message}`, 'error')
      }

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
      <div>
        <ErrorPage />
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
