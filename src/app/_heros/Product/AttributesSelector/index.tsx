import React, { useState } from 'react'

import { AttributesCollection } from '../../../../payload/payload-types'

import 'tailwindcss/tailwind.css'

interface AttributeSelectorProps {
  ProductsAttributes: AttributesCollection[]
  selectedAttributes: { [key: string]: { value: string; quantity: number }[] }
  handleAttributeSelect: (attributeName: string, value: string, quantity: number) => void
}

export const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  ProductsAttributes,
  selectedAttributes,
  handleAttributeSelect,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const isSelected = (attributeName: string, value: string) => {
    return selectedAttributes[attributeName]?.some(attr => attr.value === value)
  }

  const toggleDropdown = (attributeName: string) => {
    setOpenDropdown(openDropdown === attributeName ? null : attributeName)
  }

  const toggleAttribute = (attributeName: string, value: string) => {
    const currentQuantity =
      selectedAttributes[attributeName]?.find(attr => attr.value === value)?.quantity || 0
    handleAttributeSelect(attributeName, value, currentQuantity === 0 ? 1 : 0)
  }

  const handleQuantityChange = (attributeName: string, value: string, change: number) => {
    const currentQuantity =
      selectedAttributes[attributeName]?.find(attr => attr.value === value)?.quantity || 0
    const newQuantity = Math.max(0, currentQuantity + change)
    handleAttributeSelect(attributeName, value, newQuantity)
  }

  return (
    <div className="space-y-4">
      {ProductsAttributes.map((attribute, index) => (
        <div key={index} className="relative">
          {/* <h3 className="font-bold text-lg mb-2">{attribute.title}</h3> */}
          {attribute.Attribute_Property?.some(property => property.type === 'color') ? (
            <div className="flex flex-wrap gap-2">
              {attribute.Attribute_Property?.filter(property => property.type === 'color').map(
                (property, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        isSelected(attribute.Attribute_Name, property.colourValue)
                          ? 'border-white'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: property.colourValue }}
                      onClick={() =>
                        toggleAttribute(attribute.Attribute_Name, property.colourValue)
                      }
                    />
                    {isSelected(attribute.Attribute_Name, property.colourValue) && (
                      <div className="flex items-center bg-gray-700 rounded-full px-2 py-1">
                        <button
                          onClick={() =>
                            handleQuantityChange(attribute.Attribute_Name, property.colourValue, -1)
                          }
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
                          onClick={() =>
                            handleQuantityChange(attribute.Attribute_Name, property.colourValue, 1)
                          }
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
          ) : (
            <>
              <button
                className="w-full text-left bg-gray-200 rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleDropdown(attribute.Attribute_Name)}
              >
                {selectedAttributes[attribute.Attribute_Name]?.length > 0
                  ? selectedAttributes[attribute.Attribute_Name]
                      .map(attr => `${attr.value} (${attr.quantity})`)
                      .join(', ')
                  : 'Select'}
              </button>
              {openDropdown === attribute.Attribute_Name && (
                <div className="absolute z-10 w-full mt-1 bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                  {attribute.Attribute_Property?.map((property, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                        isSelected(attribute.Attribute_Name, property.Value)
                          ? 'bg-gray-300'
                          : 'hover:bg-gray-200'
                      }`}
                      onClick={() => toggleAttribute(attribute.Attribute_Name, property.Value)}
                    >
                      <span>{property.label}</span>
                      {isSelected(attribute.Attribute_Name, property.Value) && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleQuantityChange(attribute.Attribute_Name, property.Value, -1)
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
                              handleQuantityChange(attribute.Attribute_Name, property.Value, 1)
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
          )}
        </div>
      ))}
    </div>
  )
}

export default AttributeSelector
