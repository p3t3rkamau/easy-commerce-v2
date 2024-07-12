'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'
import CouponForm from '../CouponForm'
import ShippingForm from '../ShippingForm' // Make sure to import ShippingForm from the correct path
import EmptyCartMessage from './EmptyCartPage' // Import EmptyCartMessage component

import classes from './index.module.scss'

const encrypt = (value: number): string => {
  const key = 42
  return String.fromCharCode(value ^ key)
}

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = ({ settings, page }) => {
  const { productsPage } = settings || {}
  const { user } = useAuth()
  const { cart, cartIsEmpty, cartTotal, addItemToCart, hasInitializedCart } = useCart()
  const [shippingCost, setShippingCost] = useState(0)
  const [deliveryType, setDeliveryType] = useState('')
  const [locationId, setLocationId] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [deliveryNote, setDeliveryNote] = useState('')
  const [customLocation, setCustomLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cost, setCost] = useState<number>(0)
  const [discountedCost, setDiscountedCost] = useState<number>(0) // Initialize discountedCost to 0

  useEffect(() => {
    setCost(cartTotal.raw) // Initialize cost with cart total
  }, [cartTotal])

  const handleCouponApply = (newCost: number) => {
    setDiscountedCost(newCost) // Update discounted cost on coupon apply
  }

  const handleShippingCostChange = (cost: number) => {
    setShippingCost(cost) // Update shipping cost
  }

  const handleDeliveryTypeChange = (type: string) => {
    setDeliveryType(type) // Update delivery type
  }

  const handleLocationChange = (locId: string, locLabel: string) => {
    setLocationId(locId) // Update location ID
    setLocationLabel(locLabel) // Update location label
  }

  const handleDeliveryNoteChange = (note: string) => {
    setDeliveryNote(note) // Update delivery note
  }

  const handleCustomLocationChange = (location: string) => {
    setCustomLocation(location) // Update custom location
  }

  const encryptedShippingCost = encrypt(shippingCost) // Encrypt shipping cost for security

  const handleCheckoutClick = () => {
    setIsLoading(true) // Set loading state for checkout process

    // Construct checkout URL based on user authentication status
    const checkoutUrl = user
      ? `/checkout?deliveryType=${deliveryType}&location=${encodeURIComponent(
          locationLabel,
        )}&shippingCost=${encryptedShippingCost}&deliveryNote=${encodeURIComponent(
          deliveryNote,
        )}&customLocation=${encodeURIComponent(customLocation)}&LocationId=${encodeURIComponent(
          locationId,
        )}`
      : '/login?redirect=%2Fcheckout'

    window.location.href = checkoutUrl // Redirect to checkout URL
  }

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              <EmptyCartMessage cartIsEmpty={cartIsEmpty} productsPage={productsPage} user={user} />
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                {/* CART LIST HEADER */}
                <div className={classes.header}>
                  <p>Products</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Quantity</p>
                  </div>
                  <p className={classes.headersubtotal}>Subtotal</p>
                </div>
                {/* CART ITEM LIST */}
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta },
                        selectedAttributes,
                      } = item

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          key={`${id}-${index}`}
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                          selectedAttributes={selectedAttributes} // Pass this to CartItem
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Summary</h6>
                </div>

                <ShippingForm
                  onDeliveryCostChange={handleShippingCostChange}
                  onDeliveryTypeChange={handleDeliveryTypeChange}
                  onLocationChange={handleLocationChange}
                  onDeliveryNoteChange={handleDeliveryNoteChange}
                  onCustomLocationChange={handleCustomLocationChange}
                />
                <CouponForm currentCost={cost} onCouponApply={handleCouponApply} />

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Subtotal</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Delivery Charge</p>
                  <p className={classes.cartTotal}>Ksh{shippingCost}</p>
                </div>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Discounted Cost:</p>
                  <p className={classes.cartTotal}>Ksh{discountedCost}</p>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>Grand Total</p>
                  <p className={classes.cartTotal}>
                    Ksh
                    {parseInt(cartTotal.raw.toString()) +
                      parseInt(shippingCost.toFixed(2)) -
                      parseInt(discountedCost.toFixed(2))}
                  </p>
                </div>

                <Button
                  className={classes.checkoutButton}
                  onClick={handleCheckoutClick}
                  label={isLoading ? 'Processing...' : user ? 'Checkout' : 'Login to checkout'}
                  appearance="secondary"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
