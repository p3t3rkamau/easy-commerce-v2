'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

import { Product, User } from '../../../payload/payload-types'
import { useAuth } from '../Auth'
import { CartItem, cartReducer } from './reducer'

// Define the CartContext type
export type CartContext = {
  cart: User['cart']
  addItemToCart: (item: CartItem) => void
  deleteItemFromCart: (product: Product) => void
  cartIsEmpty: boolean | undefined
  clearCart: () => void
  isProductInCart: (product: Product) => boolean
  cartTotal: {
    formatted: string
    raw: number
  }
  hasInitializedCart: boolean
}

const Context = createContext({} as CartContext)

export const useCart = () => useContext(Context)

// Helper function to check if an array has items
const arrayHasItems = (array: unknown[]) => Array.isArray(array) && array.length > 0

export const CartProvider: React.FC = ({ children }) => {
  const { user, status: authStatus } = useAuth()

  const [cart, dispatchCart] = useReducer(cartReducer, { items: [] })
  const [total, setTotal] = useState({ formatted: '0.00', raw: 0 })
  const hasInitialized = useRef(false)
  const [hasInitializedCart, setHasInitializedCart] = useState(false)

  // Sync cart from localStorage when component mounts
  useEffect(() => {
    const syncCartFromLocalStorage = async () => {
      const localCart = localStorage.getItem('cart')
      const parsedCart = JSON.parse(localCart || '{}')

      if (arrayHasItems(parsedCart?.items)) {
        const initialCart = await Promise.all(
          parsedCart.items.map(
            async ({ product, quantity, selectedAttributes, attributePrices }) => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${product}`,
              )
              const data = await res.json()
              return { product: data, quantity, selectedAttributes, attributePrices }
            },
          ),
        )

        dispatchCart({ type: 'SET_CART', payload: { items: initialCart } })
      } else {
        dispatchCart({ type: 'SET_CART', payload: { items: [] } })
      }
    }

    if (!hasInitialized.current) {
      hasInitialized.current = true
      syncCartFromLocalStorage()
    }
  }, [])

  // Merge user cart when user logs in, clear cart when logged out
  useEffect(() => {
    if (!hasInitialized.current) return

    if (authStatus === 'loggedIn') {
      dispatchCart({ type: 'MERGE_CART', payload: user?.cart })
    }

    if (authStatus === 'loggedOut') {
      dispatchCart({ type: 'CLEAR_CART' })
    }
  }, [user, authStatus])

  // Sync cart to backend or localStorage when cart or user changes
  useEffect(() => {
    if (!hasInitialized.current || user === undefined) return

    const flattenedCart = {
      ...cart,
      items: cart?.items
        ?.map(item => ({
          ...item,
          product: item?.product?.id,
          quantity: typeof item?.quantity === 'number' ? item?.quantity : 0,
        }))
        .filter(Boolean) as unknown as CartItem[],
    }

    const syncCart = async () => {
      if (user) {
        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({ cart: flattenedCart }),
            headers: { 'Content-Type': 'application/json' },
          })

          if (req.ok) localStorage.setItem('cart', '[]')
        } catch (error) {
          console.error('Error while syncing cart to Payload:', error)
        }
      } else {
        localStorage.setItem('cart', JSON.stringify(flattenedCart))
      }
    }

    syncCart()
    setHasInitializedCart(true)
  }, [user, cart])

  // Check if a product is in the cart
  const isProductInCart = useCallback(
    (incomingProduct: Product): boolean => {
      return (
        arrayHasItems(cart?.items) &&
        cart.items.some(({ product }) =>
          typeof product === 'string'
            ? product === incomingProduct.id
            : product?.id === incomingProduct.id,)
      )
    },
    [cart],
  )

  // Add an item to the cart
  const addItemToCart = useCallback((incomingItem: CartItem) => {
    dispatchCart({ type: 'ADD_ITEM', payload: incomingItem })
  }, [])

  // Delete an item from the cart
  const deleteItemFromCart = useCallback((incomingProduct: Product) => {
    dispatchCart({ type: 'DELETE_ITEM', payload: incomingProduct })
  }, [])

  // Clear the cart
  const clearCart = useCallback(() => {
    dispatchCart({ type: 'CLEAR_CART' })
  }, [])

  // Calculate cart total and update state
  useEffect(() => {
    if (!arrayHasItems(cart?.items)) {
      setTotal({ formatted: '0.00', raw: 0 })
      return
    }

    const rawTotal = cart.items.reduce((acc, { product, quantity }) => {
      const productTotal = (product as Product).price * quantity
      const attributeTotal = Object.entries((product as Product).selectedAttributes || {}).reduce(
        (attrAcc, [attrKey, attributes]) =>
          attrAcc +
          ((product as Product).attributePrices?.[attrKey] || 0) *
            attributes.reduce((sum, attr) => sum + attr.quantity, 0),
        0,
      )

      return acc + productTotal + attributeTotal
    }, 0)

    setTotal({ formatted: rawTotal.toFixed(2), raw: rawTotal })
  }, [cart])

  const cartIsEmpty = cart?.items?.length === 0

  const contextValue = {
    cart,
    addItemToCart,
    deleteItemFromCart,
    cartIsEmpty,
    clearCart,
    isProductInCart,
    cartTotal: total,
    hasInitializedCart,
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
