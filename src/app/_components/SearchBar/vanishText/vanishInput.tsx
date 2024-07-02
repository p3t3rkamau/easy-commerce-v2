'use client'

import { PlaceholdersAndVanishInput } from './placeholders-and-vanish-input'

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = ['Puratos', 'Cake Laveler', 'Peony Flowers', 'Cupcake Maker', 'Cupcake Box']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
  }
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}
