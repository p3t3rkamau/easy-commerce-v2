import React from 'react'

import { AttributesCollection } from '../../../../payload/payload-types'
import { ColorAttributeSelector } from './ColorAttribute/ColorAttributeSelector'
import { SelectAttributeSelector } from './SelectAttribute/SelectAttributeSelector'

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
  return (
    <div className="space-y-4">
      {ProductsAttributes.map((attribute, index) => (
        <div key={index} className="relative">
          {attribute.Attribute_Property?.some(property => property.type === 'color') ? (
            <ColorAttributeSelector
              attribute={attribute}
              selectedAttributes={selectedAttributes}
              handleAttributeSelect={handleAttributeSelect}
            />
          ) : (
            <SelectAttributeSelector
              attribute={attribute}
              selectedAttributes={selectedAttributes}
              handleAttributeSelect={handleAttributeSelect}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default AttributeSelector
