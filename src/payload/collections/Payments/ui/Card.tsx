import React from 'react'

interface CardProps {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-red text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">{children}</div>
}
