import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { Order } from '../../../payload-types'
import { sendOrderCanceledEmails } from '../../../utilities/cancelOrderEmails'

export const cancelOrderHook: AfterChangeHook<Order> = async ({
  doc,
  req,
  operation,
  previousDoc,
}) => {
  const { payload } = req

  // Check if this is an update operation and the order was just canceled
  if (operation === 'update' && doc.canceled && !previousDoc?.canceled) {
    const orderedBy = typeof doc.orderedBy === 'string' ? doc.orderedBy : doc.orderedBy.id

    try {
      // Restore stock for canceled items
      for (const item of doc.items || []) {
        const { selectedAttributes, quantity } = item

        if (!selectedAttributes || typeof quantity !== 'number' || quantity <= 0) {
          console.log(`Skipping item with invalid attributes or quantity.`)
          continue
        }

        // Parse selectedAttributes safely
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
          console.log(
            `Attribute or properties not found for attributeId: ${attributes.attributeId}`,
          )
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

        // Add the quantity back to the stock
        attributeToUpdate.stock += quantity

        // Update the attribute with the new stock value
        await payload.update({
          collection: 'attributesCollection',
          id: attributes.attributeId,
          data: {
            Attribute_Property: attribute.Attribute_Property,
          },
        })
      }
    } catch (error: unknown) {
      console.error('Error restoring stock:', error)
    }

    try {
      // Fetch user details (without generic typing)
      const user = await payload.findByID({
        collection: 'users', // Ensure this is the correct collection name
        id: orderedBy,
      })

      if (user?.name && user.email) {
        await sendOrderCanceledEmails(
          { name: user.name, email: user.email },
          {
            id: doc.id,
            createdAt: doc.createdAt,
            total: doc.total,
          },
        )
      } else {
        console.error('User details are incomplete:', user)
      }
    } catch (error: unknown) {
      console.error('Error sending email:', error)
    }

    // Update the 'canceled' field of the order to true
    try {
      const result = await payload.update({
        collection: 'orders',
        id: doc.id, // Make sure to use the correct order ID
        data: {
          canceled: true,
        },
      })
      console.log('Order cancellation status updated:', result)
    } catch (error: unknown) {
      console.error('Error updating order cancellation status:', error)
    }
  }

  return
}
