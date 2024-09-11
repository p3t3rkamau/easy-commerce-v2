import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { Order } from '../../../payload-types'

export const deductStockAfterPurchase: AfterChangeHook<Order> = async ({ doc, req }) => {
  const { payload } = req

  // Ensure that items exist and is an array
  if (!doc.items || !Array.isArray(doc.items)) {
    console.log('No items found in the order.')
    return
  }

  // Loop through the items in the order
  for (const item of doc.items) {
    const { selectedAttributes, quantity } = item

    // Safeguard for undefined quantity or selectedAttributes
    if (!selectedAttributes || typeof quantity !== 'number' || quantity <= 0) {
      console.log(`Skipping item with invalid attributes or quantity.`)
      continue
    }

    // Parse selectedAttributes safely (assuming it's stored as JSON string)
    let attributes
    try {
      attributes = JSON.parse(selectedAttributes) // E.g. { attributeId: "xyz", value: "Red" }
    } catch (error: unknown) {
      console.error('Failed to parse selectedAttributes:', error)
      continue
    }

    if (!attributes?.attributeId || !attributes?.value) {
      console.log('Invalid attributes structure.')
      continue
    }

    // Fetch the attribute from the attributes collection
    const attribute = await payload.findByID({
      collection: 'attributesCollection',
      id: attributes.attributeId,
    })

    if (!attribute?.Attribute_Property || !Array.isArray(attribute.Attribute_Property)) {
      console.log(`Attribute or properties not found for attributeId: ${attributes.attributeId}`)
      continue
    }

    // Find the specific attribute property (e.g., "Red")
    const attributeToUpdate = attribute.Attribute_Property.find(
      prop => prop.Value === attributes.value,
    )

    if (!attributeToUpdate || typeof attributeToUpdate.stock !== 'number') {
      console.log(`Stock or attribute value not found for: ${attributes.value}`)
      continue
    }

    // Ensure sufficient stock is available
    if (attributeToUpdate.stock >= quantity) {
      // Deduct the quantity from the stock
      attributeToUpdate.stock -= quantity

      // Update the attribute with the new stock value
      await payload.update({
        collection: 'attributesCollection',
        id: attributes.attributeId,
        data: {
          Attribute_Property: attribute.Attribute_Property,
        },
      })
    } else {
      // Handle cases where stock is insufficient
      console.log(
        `Insufficient stock for ${attributes.value}. Available: ${attributeToUpdate.stock}, Required: ${quantity}`,
      )
      throw new Error(`Insufficient stock for ${attributes.value}`)
    }
  }
}
