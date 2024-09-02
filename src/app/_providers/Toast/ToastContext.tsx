import React, { createContext, ReactNode, useContext, useState } from 'react'

import Toast from '../../_components/Toast'

interface ToastContextType {
  addToast: (
    message: string,
    type?: 'success' | 'error' | 'info',
    action?: { label: string; onClick: () => void },
  ) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<
    {
      message: string
      type?: 'success' | 'error' | 'info'
      action?: { label: string; onClick: () => void }
    }[]
  >([])

  const addToast = (
    message: string,
    type?: 'success' | 'error' | 'info',
    action?: { label: string; onClick: () => void },
  ) => {
    setToasts(prev => [...prev, { message, type, action }])
  }

  const handleClose = (index: number) => {
    setToasts(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            type={toast.type}
            onClose={() => handleClose(index)}
            action={toast.action}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
