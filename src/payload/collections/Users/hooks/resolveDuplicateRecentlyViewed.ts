import type { FieldHook } from 'payload/types'

import type { User } from '../../../payload-types'

export const resolveDuplicateRecentlyViewed: FieldHook<User> = async ({ value, operation }) => {
  if ((operation === 'create' || operation === 'update') && value) {
    return Array.from(
      new Set(value?.map(product => (typeof product === 'string' ? product : product.id)) || []),
    )
  }
  return value
}
