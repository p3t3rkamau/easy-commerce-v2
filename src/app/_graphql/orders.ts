import { PRODUCT } from './products'

export const ORDERS = `
  query Orders {
    Orders(limit: 300) {
      docs {
        id
      }
    }
  }
`

export const ORDER = `
  query Order($id: String) {
    Orders(where: { id: { equals: $id } }) {
      docs {
        id
        orderedBy
        items {
          product ${PRODUCT}
          title
          price
          quantity
          selectedAttributes
          
        }
        phoneNumber
        refId
        orderNotes
        deliveryType
        location
        locationLabel
        deliveryNote
      }
    }
  }
`
