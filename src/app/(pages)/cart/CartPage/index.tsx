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

import classes from './index.module.scss'

const encrypt = (value: number): string => {
  const key = 42 // Example encryption key (not secure, for demonstration only)
  return String.fromCharCode(value ^ key)
}

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
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
  const [error, setError] = React.useState<string | null>(null)
  const [cost, setCost] = useState<number>(0) // Example initial cost
  const [discountedCost, setDiscountedCost] = useState<number>(cost)

  const handleCouponApply = (newCost: number) => {
    setDiscountedCost(newCost)
  }

  const handleShippingCostChange = (cost: number) => {
    setShippingCost(cost)
    setCost(cost)
    // Recalculate any dependent values here, if needed
  }

  const handleDeliveryTypeChange = (type: string) => {
    setDeliveryType(type)
  }

  const handleLocationChange = (locId: string, locLabel: string) => {
    setLocationId(locId)
    setLocationLabel(locLabel)
  }

  const encryptedShippingCost = encrypt(shippingCost)

  const handleCheckoutClick = () => {
    setIsLoading(true)
    const checkoutUrl = user
      ? `/checkout?deliveryType=${deliveryType}&location=${encodeURIComponent(
          locationLabel,
        )}&shippingCost=${encryptedShippingCost}&deliveryNote=${encodeURIComponent(
          deliveryNote,
        )}&customLocation=${encodeURIComponent(customLocation)}`
      : '/login?redirect=%2Fcheckout'
    window.location.href = checkoutUrl
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
              Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Click here</Link>
                  {` to shop.`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>Log in</Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
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
                  deliveryNote={deliveryNote} // Pass deliveryNote as prop
                  customLocation={customLocation} // Pass customLocation as prop
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
                    Ksh{parseInt(cartTotal.raw.toString()) + parseInt(shippingCost.toFixed(2))}
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
