import React, { useState } from 'react'

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
  const [openDropdown, setOpenDropdown] = useState(false)

  const isSelected = (value: string) => {
    return selectedAttributes[attribute.Attribute_Name]?.some(attr => attr.value === value)
  }

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown)
  }

  const toggleAttribute = (value: string) => {
    const currentQuantity =
      selectedAttributes[attribute.Attribute_Name]?.find(attr => attr.value === value)?.quantity ||
      0
    handleAttributeSelect(attribute.Attribute_Name, value, currentQuantity === 0 ? 1 : 0)
  }

  const handleQuantityChange = (value: string, change: number) => {
    const currentQuantity =
      selectedAttributes[attribute.Attribute_Name]?.find(attr => attr.value === value)?.quantity ||
      0
    const newQuantity = Math.max(0, currentQuantity + change)
    handleAttributeSelect(attribute.Attribute_Name, value, newQuantity)
  }

  return (
    <>
      <button
        className="w-full text-left bg-gray-200 rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {selectedAttributes[attribute.Attribute_Name]?.length > 0
          ? selectedAttributes[attribute.Attribute_Name]
              .map(attr => `${attr.value} (${attr.quantity})`)
              .join(', ')
          : 'Select'}
      </button>
      {openDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          {attribute.Attribute_Property?.map((property, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                isSelected(property.Value) ? 'bg-gray-300' : 'hover:bg-gray-200'
              }`}
              onClick={() => toggleAttribute(property.Value)}
            >
              <span>{property.label}</span>
              {isSelected(property.Value) && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleQuantityChange(property.Value, -1)
                    }}
                    className="text-lg font-bold"
                  >
                    -
                  </button>
                  <span>
                    {selectedAttributes[attribute.Attribute_Name]?.find(
                      attr => attr.value === property.Value,
                    )?.quantity || 0}
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleQuantityChange(property.Value, 1)
                    }}
                    className="text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SelectAttributeSelector
