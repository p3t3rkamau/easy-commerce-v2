import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

import { animals } from './data.jsx'

export default function MultipleSelectNextUI() {
  return (
    <Select
      label="Favorite Animal"
      placeholder="Select an animal"
      selectionMode="multiple"
      className="max-w-xs"
    >
      {animals.map(animal => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  )
}
