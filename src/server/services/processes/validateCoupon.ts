import payload from 'payload'

export const validateCoupon = async (code: unknown) => {
  try {
    const coupon = await payload.find({
      collection: 'coupons',
      where: {
        code: {
          equals: code,
        },
      },
    })

    if (coupon.totalDocs === 0) {
      throw new Error('Coupon not found')
    }

    const { type, value, applicableTo, expiryDate } = coupon.docs[0]

    if (expiryDate && new Date(expiryDate) < new Date()) {
      throw new Error('Coupon has expired')
    }

    return {
      type,
      value,
      applicableTo,
    }
  } catch (error: unknown) {
    console.error('Error validating coupon:', error)
    throw error
  }
}
