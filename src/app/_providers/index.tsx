'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
import { FilterProvider } from './Filter'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <NextUIProvider>
        <AuthProvider>
          <FilterProvider>
            <CartProvider>{children}</CartProvider>
          </FilterProvider>
        </AuthProvider>
      </NextUIProvider>
    </ThemeProvider>
  )
}
