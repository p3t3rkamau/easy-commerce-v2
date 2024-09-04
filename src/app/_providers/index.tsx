'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
import ErrorBoundary from './ErrorBoundary' // Import the functional ErrorBoundary
import { FilterProvider } from './Filter'
import { ThemeProvider } from './Theme'
import { ToastProvider } from './Toast/ToastContext'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <NextUIProvider>
          <AuthProvider>
            <FilterProvider>
              <CartProvider>
                <ErrorBoundary> {children}</ErrorBoundary>
              </CartProvider>
            </FilterProvider>
          </AuthProvider>
        </NextUIProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
