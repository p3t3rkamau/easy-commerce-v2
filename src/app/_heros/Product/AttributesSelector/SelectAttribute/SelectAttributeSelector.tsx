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
  // Check if a specific value is selected
  const isSelected = (value: string) => {
    return selectedAttributes[attribute.Attribute_Name]?.some(attr => attr.value === value)
  }

  // Handle selection of an attribute value via dropdown
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const property = attribute.Attribute_Property?.find(prop => prop.Value === value)

    // Check if the selected attribute is in stock
    if (property?.stock === 0) {
      alert(`${value} is out of stock`)
      return
    }

    handleAttributeSelect(attribute.Attribute_Name, value, 1) // Default quantity to 1
  }

  // Handle quantity change based on stock availability
  const handleQuantityChange = (value: string, change: number, stock: number) => {
    const currentQuantity =
      selectedAttributes[attribute.Attribute_Name]?.find(attr => attr.value === value)?.quantity ||
      0

    // Ensure that the new quantity doesn't exceed stock
    const newQuantity = Math.max(0, Math.min(stock, currentQuantity + change))

    if (newQuantity === 0) {
      alert(`${value} is out of stock`)
    } else {
      handleAttributeSelect(attribute.Attribute_Name, value, newQuantity)
    }
  }

  return (
    <div className="space-y-4">
      {/* Dropdown for selecting attributes */}
      <select className="border rounded p-2" onChange={handleDropdownChange} defaultValue="">
        <option value="" disabled>
          Select {attribute.Attribute_Name}
        </option>
        {attribute.Attribute_Property?.map((property, idx) => (
          <option
            key={idx}
            value={property.Value || ''}
            disabled={property.stock === 0} // Disable out-of-stock items
          >
            {property.label} {property.stock === 0 ? '(Out of stock)' : ''}
          </option>
        ))}
      </select>

      {/* Quantity controls for the selected value */}
      {attribute.Attribute_Property?.map((property, idx) =>
        isSelected(property.Value || '') ? (
          <div key={idx} className="flex items-center space-x-2">
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
          </div>
        ) : null,
      )}
    </div>
  )
}

export default SelectAttributeSelector
