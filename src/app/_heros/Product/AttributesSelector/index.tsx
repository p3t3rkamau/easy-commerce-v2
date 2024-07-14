import React, { useState } from 'react'

import { AttributesCollection } from '../../../../payload/payload-types'

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
  const [quantities, setQuantities] = useState<{ [key: string]: { [value: string]: number } }>({})
  const [isDropdownOpen, setDropdownOpen] = useState<string | null>(null)

  const isSelected = (attributeName: string, value: string) => {
    return selectedAttributes[attributeName]?.some(attr => attr.value === value)
  }

  const handleQuantityChange = (attributeName: string, value: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [attributeName]: {
        ...prev[attributeName],
        [value]: quantity,
      },
    }))
    handleAttributeSelect(attributeName, value, quantity)
  }

  const handleSelectOrDeselect = (attributeName: string, value: string) => {
    if (isSelected(attributeName, value)) {
      handleQuantityChange(attributeName, value, 0) // Deselect by setting quantity to 0
    } else {
      handleQuantityChange(attributeName, value, 1) // Select with default quantity 1
    }
  }

  const toggleDropdown = (attributeName: string) => {
    setDropdownOpen(isDropdownOpen === attributeName ? null : attributeName)
  }

  return (
    <div>
      {ProductsAttributes &&
        ProductsAttributes.map((attribute, index) => (
          <div key={index} className="mb-4">
            <div className="font-bold text-lg mb-2">{`Select ${attribute.title}`}</div>
            {attribute.Attribute_Property?.some(property => property.type === 'color') ? (
              <div className="flex flex-wrap gap-2">
                {attribute.Attribute_Property?.map((property, idx) =>
                  property.type === 'color' ? (
                    <div key={idx} className="relative cursor-pointer">
                      <div
                        className={`w-8 h-8 rounded-full border-2 transition ${
                          isSelected(attribute.Attribute_Name, property.colourValue)
                            ? 'border-green-500'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: property.colourValue }}
                        onClick={() =>
                          handleSelectOrDeselect(attribute.Attribute_Name, property.colourValue)
                        }
                      ></div>
                      {isSelected(attribute.Attribute_Name, property.colourValue) && (
                        <input
                          type="number"
                          min="1"
                          value={quantities[attribute.Attribute_Name]?.[property.colourValue] || 1}
                          onChange={e =>
                            handleQuantityChange(
                              attribute.Attribute_Name,
                              property.colourValue,
                              parseInt(e.target.value, 10),
                            )
                          }
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 p-1 text-sm"
                        />
                      )}
                    </div>
                  ) : null,
                )}
              </div>
            ) : (
              <div className="relative">
                <div
                  className="border border-gray-300 rounded-md px-4 py-2 bg-white cursor-pointer"
                  onClick={() => toggleDropdown(attribute.Attribute_Name)}
                >
                  {`Select ${attribute.title}`}
                </div>
                {isDropdownOpen === attribute.Attribute_Name && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
                    {attribute.Attribute_Property?.map((property, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2 cursor-pointer transition ${
                          isSelected(attribute.Attribute_Name, property.Value)
                            ? 'bg-green-500 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() =>
                          handleSelectOrDeselect(attribute.Attribute_Name, property.Value)
                        }
                      >
                        <span>{property.label}</span>
                        {isSelected(attribute.Attribute_Name, property.Value) && (
                          <input
                            type="number"
                            min="1"
                            value={quantities[attribute.Attribute_Name]?.[property.Value] || 1}
                            onChange={e =>
                              handleQuantityChange(
                                attribute.Attribute_Name,
                                property.Value,
                                parseInt(e.target.value, 10),
                              )
                            }
                            className="ml-2 w-12 p-1 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default AttributeSelector
