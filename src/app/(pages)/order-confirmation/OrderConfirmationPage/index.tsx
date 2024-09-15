'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import ConfettiEffect from '../../../_components/Confetti'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'
import { useLoader } from '../../../_providers/LoaderContext'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')
  const { clearCart } = useCart()

  const { showLoader, hideLoader } = useLoader() // Get loader functions

  useEffect(() => {
    clearCart()
  }, [clearCart])

  // Function to handle order cancellation
  const handleCancelOrder = async () => {
    const confirmation = window.confirm('Do you really wish to cancel your order?')
    if (confirmation) {
      showLoader() // Show loader while canceling the order
      try {
        const response = await fetch(`/api/orders/${orderID}/cancel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to cancel the order')
        }

        alert('Your order has been canceled successfully!')
        // Optionally, you can redirect or update the UI here.
      } catch (error) {
        console.error('Error canceling order:', error)
        alert('An error occurred while canceling your order. Please try again later.')
      } finally {
        hideLoader() // Hide loader after the process completes
      }
    }
  }

  return (
    <div>
      {!error && <ConfettiEffect />}
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="View account" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Thank you for your order!</h1>
          <p>
            {`Your order has been confirmed. You will receive an email confirmation shortly. Your order ID is ${orderID}.`}
          </p>
          <div className={classes.actions}>
            <Button href={`/account/orders/${orderID}`} label="View order" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="View all orders"
              appearance="secondary"
            />
            {/* Cancel Order Button */}
            <Button onClick={handleCancelOrder} label="Cancel Order" appearance="danger" />
          </div>
        </Fragment>
      )}
    </div>
  )
}
