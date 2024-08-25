import { useState } from 'react'

import type { AttributesCollection } from '../../../payload/payload-types'

export const useAttributeHandler = (ProductsAttributes: AttributesCollection[]) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: Array<{ value: string; quantity: number }>
  }>({})
  const [selectedAttributePrice, setSelectedAttributePrice] = useState<number | null>(null)

  const handleAttributeSelect = (attributeName: string, value: string, quantity: number) => {
    setSelectedAttributes(prevAttributes => {
      const currentAttributes = prevAttributes[attributeName] || []
      const attributeIndex = currentAttributes.findIndex(attr => attr.value === value)
      let newAttributes

      if (attributeIndex >= 0) {
        newAttributes = currentAttributes.map((attr, idx) =>
          idx === attributeIndex ? { ...attr, quantity } : attr,
        )
      } else {
        newAttributes = [...currentAttributes, { value, quantity }]
      }

      const attribute = ProductsAttributes.find(
        attr => attr.Attribute_Name === attributeName,
      ) as AttributesCollection

      const selectedProperties = attribute?.Attribute_Property?.filter(prop =>
        newAttributes.map(attr => attr.value).includes(prop.Value),
      )

      if (selectedProperties && selectedProperties.length > 0) {
        const totalSelectedPrice = selectedProperties.reduce(
          (total, prop) =>
            total +
            (prop.price || 0) *
              (newAttributes.find(attr => attr.value === prop.Value)?.quantity || 0),
          0,
        )
        setSelectedAttributePrice(totalSelectedPrice)
      } else {
        setSelectedAttributePrice(null)
      }

      return {
        ...prevAttributes,
        [attributeName]: newAttributes,
      }
    })
  }

  return { selectedAttributes, selectedAttributePrice, handleAttributeSelect }
}
