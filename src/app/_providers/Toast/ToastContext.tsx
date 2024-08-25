// ToastContext.tsx
import React, { createContext, ReactNode, useState } from 'react'

import Toast from '../../_components/Toast'

interface ToastContextType {
  addToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<string[]>([])

  const addToast = (message: string) => {
    setToasts(prevToasts => [...prevToasts, message])
  }

  const removeToast = (index: number) => {
    setToasts(prevToasts => prevToasts.filter((_, i) => i !== index))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((message, index) => (
          <Toast key={index} message={message} onClose={() => removeToast(index)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
