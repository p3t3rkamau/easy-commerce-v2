'use client'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Price } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const router = useRouter()
  const { cart, cartTotal } = useCart()

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      try {
        // Create an order without payment processing
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: cartTotal.raw,
            items: (cart?.items || []).map(({ product, quantity, selectedAttributes }) => ({
              product: typeof product === 'object' ? product.id : product,
              quantity,
              price: typeof product === 'object' ? product.price : undefined,
              selectedAttributes: typeof product === 'object' ? selectedAttributes : undefined, // Include selected attributes
            })),
          }),
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

        const { error: errorFromRes, doc }: { message?: string; error?: string; doc: Order } =
          await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        router.push(`/order-confirmation?order_id=${doc.id}`)
      } catch (err) {
        console.error('Error occurred while creating order:', err)
        router.push(`/app?error=${encodeURIComponent(err.message)}`)
      }
    },
    [cart, cartTotal, router],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <Button label="Checkout" type="submit" appearance="secondary" />
      </div>
    </form>
  )
}

export default CheckoutForm
