import React, { createContext, ReactNode, useContext, useState } from 'react'

import Loader from '../../_components/Loader'

interface LoaderContextType {
  showLoader: () => void
  hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const showLoader = () => setLoading(true)
  const hideLoader = () => setLoading(false)

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}
