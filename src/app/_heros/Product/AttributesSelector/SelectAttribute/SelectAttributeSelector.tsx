import React from 'react'

import { AttributesCollection } from '../../../../../payload/payload-types'

interface SelectAttributeSelectorProps {
  attribute: AttributesCollection
  selectedAttributes: { [key: string]: { value: string; quantity: number }[] }
  handleAttributeSelect: (attributeName: string, value: string, quantity: number) => void
}

export const SelectAttributeSelector: React.FC<SelectAttributeSelectorProps> = ({
  attribute,
  selectedAttributes,
  handleAttributeSelect,
}) => {
  // Maintain the existing functionality for isSelected
  const isSelected = (value: string) => {
    return selectedAttributes[attribute.Attribute_Name]?.some(attr => attr.value === value)
  }

  // Toggle the selection of an attribute, with stock check
  const toggleAttribute = (value: string, stock: number) => {
    const currentQuantity =
      selectedAttributes[attribute.Attribute_Name]?.find(attr => attr.value === value)?.quantity ||
      0

    // Only allow selection if in stock
    if (stock === 0) {
      alert(`${value} is out of stock`)
      return
    }

    handleAttributeSelect(attribute.Attribute_Name, value, currentQuantity === 0 ? 1 : 0)
  }

  // Function to handle quantity changes
  const handleQuantityChange = (value: string, change: number, stock: number) => {
    const currentQuantity =
      selectedAttributes[attribute.Attribute_Name]?.find(attr => attr.value === value)?.quantity ||
      0

    // Calculate the new quantity but ensure it doesn't exceed stock
    const newQuantity = Math.max(0, Math.min(stock, currentQuantity + change))

    if (newQuantity === 0) {
      alert(`${value} is out of stock`)
    } else {
      handleAttributeSelect(attribute.Attribute_Name, value, newQuantity)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {attribute.Attribute_Property?.map((property, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
              isSelected(property.Value || '') ? 'border-white' : 'border-transparent'
            }`}
            style={{ backgroundColor: property.colourValue || '#fff' }}
            onClick={() => toggleAttribute(property.Value || '', property.stock || 0)} // Added stock check
          />
          {isSelected(property.Value || '') && (
            <div className="flex items-center bg-gray-700 rounded-full px-2 py-1">
              <button
                onClick={() => handleQuantityChange(property.Value || '', -1, property.stock || 0)}
                className="text-white px-1"
              >
                -
              </button>
              <span className="text-white mx-2">
                {selectedAttributes[attribute.Attribute_Name]?.find(
                  attr => attr.value === property.Value,
                )?.quantity || 1}
              </span>
              <button
                onClick={() => handleQuantityChange(property.Value || '', 1, property.stock || 0)}
                className="text-white px-1"
              >
                +
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SelectAttributeSelector
