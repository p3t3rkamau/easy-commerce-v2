import { useCallback, useState } from 'react'

import type { AttributesCollection } from '../../payload/payload-types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAttributeHandler = (ProductsAttributes: AttributesCollection[]) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: Array<{ value: string; quantity: number }>
  }>({})
  const [selectedAttributePrice, setSelectedAttributePrice] = useState<number | null>(null)

  const handleAttributeSelect = useCallback(
    (attributeName: string, value: string, quantity: number) => {
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

        // Calculate total price of selected attributes
        const totalSelectedPrice =
          selectedProperties?.reduce(
            (total, prop) =>
              total +
              (prop.price || 0) *
                (newAttributes.find(attr => attr.value === prop.Value)?.quantity || 0),
            0,
          ) || 0

        setSelectedAttributePrice(totalSelectedPrice)

        return {
          ...prevAttributes,
          [attributeName]: newAttributes,
        }
      })
    },
    [ProductsAttributes],
  )

  return { selectedAttributes, selectedAttributePrice, handleAttributeSelect }
}
