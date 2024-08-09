import React, { createContext, useContext, useState } from 'react'

interface PaymentState {
  currentPayment: any
  paymentHistory: any[]
  setCurrentPayment: (payment: any) => void
  addToPaymentHistory: (payment: any) => void
}

const PaymentContext = createContext<PaymentState | undefined>(undefined)

export const PaymentProvider: React.FC = ({ children }) => {
  const [currentPayment, setCurrentPayment] = useState(null)
  const [paymentHistory, setPaymentHistory] = useState([])

  const addToPaymentHistory = (payment: any) => {
    setPaymentHistory(prev => [...prev, payment])
  }

  return (
    <PaymentContext.Provider
      value={{ currentPayment, paymentHistory, setCurrentPayment, addToPaymentHistory }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export const usePaymentState = () => {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePaymentState must be used within a PaymentProvider')
  }
  return context
}
