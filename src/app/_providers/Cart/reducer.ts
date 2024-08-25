import type { CartItems, Product, User } from '../../../payload/payload-types'

// Define the structure of a CartItem
export interface CartItem {
  product: Product
  quantity: number
  selectedAttributes: { [key: string]: Array<{ value: string; quantity: number }> }
  attributePrices?: { [key: string]: number | undefined }
}

// Define the type for the cart, which is tied to the User's cart
type CartType = User['cart']

// Define the possible actions for the cart reducer
type CartAction =
  | { type: 'SET_CART'; payload: CartType }
  | { type: 'MERGE_CART'; payload: CartType }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'DELETE_ITEM'; payload: Product }
  | { type: 'CLEAR_CART' }

// Utility function to get product ID
const getProductId = (product: Product | string) =>
  typeof product === 'string' ? product : product.id

// Utility function to compare products and selected attributes
const isSameCartItem = (item1: CartItem, item2: CartItem) =>
  getProductId(item1.product) === getProductId(item2.product) &&
  JSON.stringify(item1.selectedAttributes) === JSON.stringify(item2.selectedAttributes)

// Cart reducer function
export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const mergedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(action.payload.items || []),
      ].reduce((acc: CartItem[], currentItem) => {
        const existingIndex = acc.findIndex(item => isSameCartItem(item, currentItem))

        if (existingIndex > -1) {
          // Combine quantities and attribute prices
          acc[existingIndex].quantity += currentItem.quantity
        } else {
          acc.push(currentItem)
        }

        return acc
      }, [])

      return {
        ...cart,
        items: mergedItems,
      }
    }

    case 'ADD_ITEM': {
      const newItem = action.payload
      const existingIndex = cart?.items?.findIndex(item => isSameCartItem(item, newItem))

      const updatedItems =
        existingIndex === -1
          ? [...(cart?.items || []), newItem]
          : cart.items.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item,)

      return {
        ...cart,
        items: updatedItems,
      }
    }

    case 'DELETE_ITEM': {
      const productIdToRemove = getProductId(action.payload)

      const updatedItems = cart.items.filter(
        item => getProductId(item.product) !== productIdToRemove,
      )

      return {
        ...cart,
        items: updatedItems,
      }
    }

    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}
