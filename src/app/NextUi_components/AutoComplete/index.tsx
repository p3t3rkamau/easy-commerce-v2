import React from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

import { animals } from './data.jsx'

export default function AutoCompleteNextUi() {
  return (
    <Autocomplete
      allowsCustomValue
      label="Search an animal"
      variant="bordered"
      className="max-w-xs"
      defaultItems={animals}
    >
      {item => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  )
}
