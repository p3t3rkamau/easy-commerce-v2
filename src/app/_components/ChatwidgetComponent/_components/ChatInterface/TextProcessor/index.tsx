import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Import a lightweight NLP library (you may need to install this)
import natural from 'natural'

import { Product } from '../../../../../../payload/payload-types'
import { useCart } from '../../../../../_providers/Cart'
import TextArea from '../../../../../NextUi_components/textarea'

import styles from './index.module.scss'

const AutomaticOrderProcessor = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [unrecognizedItems, setUnrecognizedItems] = useState<string[]>([])
  const { addItemToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.post('/api/search', { query: '' }) // Fetch all products
      setProducts(response.data.results)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
  }

  const processOrder = () => {
    if (!userInput.trim()) return

    setProcessing(true)
    const lines = userInput.split('\n')
    const unrecognized: string[] = []

    lines.forEach(line => {
      const orderItem = parseOrderLine(line)
      if (orderItem) {
        const matchedProduct = findBestMatch(orderItem.itemName, products)
        if (matchedProduct && !matchedProduct.OutOfStock) {
          addItemToCart({
            product: matchedProduct,
            quantity: orderItem.quantity,
            selectedAttributes: orderItem.attributes
              ? { attribute: orderItem.attributes }
              : undefined,
          })
        } else {
          unrecognized.push(line)
        }
      } else {
        unrecognized.push(line)
      }
    })

    setUnrecognizedItems(unrecognized)
    setProcessing(false)
  }

  const parseOrderLine = (
    line: string,
  ): { itemName: string; quantity: number; attributes?: string } | null => {
    const quantityMatch = line.match(/(\d+)\s*x?\s*(.+)/i)
    if (quantityMatch) {
      const quantity = parseInt(quantityMatch[1], 10)
      const itemName = quantityMatch[2].trim()
      const attributesMatch = itemName.match(/(.*)\s*\((.*)\)/)
      if (attributesMatch) {
        return {
          itemName: attributesMatch[1].trim(),
          quantity,
          attributes: attributesMatch[2].trim(),
        }
      }
      return { itemName, quantity }
    }
    return null
  }

  const findBestMatch = (itemName: string, products: Product[]): Product | null => {
    const tokenizer = new natural.WordTokenizer()
    const itemTokens = tokenizer.tokenize(itemName.toLowerCase())

    let bestMatch: Product | null = null
    let highestScore = 0

    products.forEach(product => {
      const productTokens = tokenizer.tokenize(product.title.toLowerCase())
      const score = natural.JaroWinklerDistance(itemTokens.join(' '), productTokens.join(' '))
      if (score > highestScore && score > 0.8) {
        // Adjust threshold as needed
        highestScore = score
        bestMatch = product
      }
    })

    return bestMatch
  }

  return (
    <div className={styles.parentContainer}>
      <TextArea />
      <textarea
        className={styles.textarea}
        placeholder="Enter your order here..."
        value={userInput}
        onChange={handleInputChange}
      />
      <button
        className={styles.sendButton}
        onClick={processOrder}
        disabled={loading || processing || !userInput.trim()}
      >
        {processing ? 'Processing...' : 'Process Order'}
      </button>
      {unrecognizedItems.length > 0 && (
        <div className={styles.unrecognizedItems}>
          <h3>Unrecognized or Out of Stock Items:</h3>
          <ul>
            {unrecognizedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AutomaticOrderProcessor
