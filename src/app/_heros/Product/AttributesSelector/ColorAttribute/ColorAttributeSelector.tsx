import React from 'react'

import { AttributesCollection } from '../../../../../payload/payload-types'

interface ColorAttributeSelectorProps {
  attribute: AttributesCollection
  selectedAttributes: { [key: string]: { value: string; quantity: number }[] }
  handleAttributeSelect: (attributeName: string, value: string, quantity: number) => void
}

export const ColorAttributeSelector: React.FC<ColorAttributeSelectorProps> = ({
  attribute,
  selectedAttributes,
  handleAttributeSelect,
}) => {
  const isSelected = (value: string) => {
    return selectedAttributes[attribute.Attribute_Name]?.some(attr => attr.value === value)
  }

  const handleQuantityChange = (value: string, change: number) => {
    const currentQuantity =
      selectedAttributes[attribute.Attribute_Name]?.find(attr => attr.value === value)?.quantity ||
      0
    const newQuantity = Math.max(0, currentQuantity + change)
    handleAttributeSelect(attribute.Attribute_Name, value, newQuantity)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {attribute.Attribute_Property?.filter(property => property.type === 'color').map(
        (property, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                isSelected(property.colourValue) ? 'border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: property.colourValue }}
              onClick={() => handleQuantityChange(property.colourValue, 1)}
            />
            {isSelected(property.colourValue) && (
              <div className="flex items-center bg-gray-700 rounded-full px-2 py-1">
                <button
                  onClick={() => handleQuantityChange(property.colourValue, -1)}
                  className="text-white px-1"
                >
                  -
                </button>
                <span className="text-white mx-2">
                  {selectedAttributes[attribute.Attribute_Name]?.find(
                    attr => attr.value === property.colourValue,
                  )?.quantity || 1}
                </span>
                <button
                  onClick={() => handleQuantityChange(property.colourValue, 1)}
                  className="text-white px-1"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}

export default ColorAttributeSelector
