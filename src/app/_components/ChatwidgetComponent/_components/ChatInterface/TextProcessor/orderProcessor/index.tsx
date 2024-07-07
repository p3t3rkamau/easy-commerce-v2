import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation' // Ensure correct import for useRouter

import { Product } from '../../../../../../../payload/payload-types' // Adjust import as per your setup
import { useCart } from '../../../../../../_providers/Cart'

const OrderProcessor: React.FC<{
  message: string
  products: Product[]
}> = ({ message, products }) => {
  const { addItemToCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    const parsedItems = parseWhatsAppMessage(message)
    addItemsToCart(parsedItems)
  }, [message, products])

  const parseWhatsAppMessage = (message: string) => {
    const items: { itemName: string; quantity: number; attributes?: string }[] = []

    const lines = message.split('\n')
    lines.forEach(line => {
      const match = line.match(/^(.*) - Quantity: (\d+) - Attributes: (.*)$/)
      if (match) {
        const itemName = match[1].trim()
        const quantity = parseInt(match[2].trim(), 10)
        const attributes = match[3].trim()
        items.push({ itemName, quantity, attributes })
      } else {
        const matchWithoutAttributes = line.match(/^(.*) - Quantity: (\d+)$/)
        if (matchWithoutAttributes) {
          const itemName = matchWithoutAttributes[1].trim()
          const quantity = parseInt(matchWithoutAttributes[2].trim(), 10)
          items.push({ itemName, quantity })
        }
      }
    })

    return items
  }

  const addItemsToCart = (
    parsedItems: { itemName: string; quantity: number; attributes?: string }[],
  ) => {
    parsedItems.forEach(item => {
      const product = products.find(p => p.title.toLowerCase() === item.itemName.toLowerCase())
      if (product) {
        addItemToCart({
          product,
          quantity: item.quantity,
          selectedAttributes: item.attributes ? { attribute: item.attributes } : undefined,
          // Adjust as per your attribute handling
        })
      }
    })

    // router.push('/cart') // Redirect to cart after adding items
  }

  return null // This component doesn't render anything visible
}

export default OrderProcessor
s