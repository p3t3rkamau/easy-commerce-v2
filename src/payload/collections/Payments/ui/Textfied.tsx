import React from 'react'

interface TextFieldProps {
  label: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
