import type { CartItems, Product, User } from '../../../payload/payload-types'

export interface CartItem {
  product: Product
  quantity: number
  selectedAttributes: { [key: string]: Array<{ value: string; quantity: number }> }
  attributePrices?: { [key: string]: number | undefined }
}

type CartType = User['cart']

type CartAction =
  | {
      type: 'SET_CART'
      payload: CartType
    }
  | {
      type: 'MERGE_CART'
      payload: CartType
    }
  | {
      type: 'ADD_ITEM'
      payload: CartItem
    }
  | {
      type: 'DELETE_ITEM'
      payload: Product
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        const productId = typeof item.product === 'string' ? item.product : item?.product?.id

        const indexInAcc = acc.findIndex(
          ({ product, selectedAttributes }) =>
            (typeof product === 'string' ? product === productId : product?.id === productId) &&
            JSON.stringify(selectedAttributes) === JSON.stringify(item.selectedAttributes),
        )

        if (indexInAcc > -1) {
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            quantity: acc[indexInAcc].quantity + item.quantity,
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])

      return {
        ...cart,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      const { payload: incomingItem } = action
      const productId =
        typeof incomingItem.product === 'string' ? incomingItem.product : incomingItem?.product?.id

      const indexInCart = cart?.items?.findIndex(
        ({ product, selectedAttributes }) =>
          (typeof product === 'string' ? product === productId : product?.id === productId) &&
          JSON.stringify(selectedAttributes) === JSON.stringify(incomingItem.selectedAttributes),
      )

      let withAddedItem = [...(cart?.items || [])]

      if (indexInCart === -1) {
        withAddedItem.push(incomingItem)
      } else if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: withAddedItem[indexInCart].quantity + incomingItem.quantity,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'DELETE_ITEM': {
      const { payload: incomingProduct } = action
      const withDeletedItem = { ...cart }

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'string'
          ? product === incomingProduct.id
          : product?.id === incomingProduct.id,
      )

      if (typeof indexInCart === 'number' && withDeletedItem.items && indexInCart > -1)
        withDeletedItem.items.splice(indexInCart, 1)

      return withDeletedItem
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
