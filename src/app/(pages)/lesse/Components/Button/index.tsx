import React from 'react'

interface CustomButtonProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}

const Button: React.FC<CustomButtonProps> = ({ className, onClick, children, style }) => {
  return (
    <button
      className={`h-[67.9px] flex-1 shadow-lg z-1 bg-pink-600 text-white rounded-xl hover:bg-pink-700 ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
