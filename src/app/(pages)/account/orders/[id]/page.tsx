import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Media } from '../../../../_components/Media'
import { Price } from '../../../../_components/Price'
import { formatDateTime } from '../../../../_utilities/formatDateTime'
import { getMeUser } from '../../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view this order.',
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  })

  let order = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    }).then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error)
  }

  if (!order) {
    notFound()
  }

  const orderDetails = [
    { label: 'Order ID', value: order.id },
    { label: 'Payment Intent', value: order.refId },
    { label: 'Delivery Location', value: order.location },
    { label: 'Delivery Type', value: order.deliveryType },
    { label: 'Delivery Cost', value: order.deliveryCost },
    { label: 'Phone Number', value: order.phoneNumber },
    { label: 'Delivery Note', value: order.deliveryNote },
    { label: 'Ordered On', value: formatDateTime(order.createdAt) },
  ]

  return (
    <div className={classes.orderContainer}>
      <h1 className={classes.orderTitle}>
        Order <span className={classes.id}>{order.id}</span>
      </h1>

      <div className={classes.orderDetails}>
        {orderDetails.map(
          ({ label, value }) =>
            value && (
              <div key={label} className={classes.detailItem}>
                <span className={classes.detailLabel}>{label}:</span>
                <span className={classes.detailValue}>{value}</span>
              </div>
            ),
        )}
        <div className={classes.totalContainer}>
          <span className={classes.totalLabel}>Total:</span>
          <span className={classes.totalValue}>
            {new Intl.NumberFormat('KES', {
              style: 'currency',
              currency: 'Ksh',
            }).format(order.total / 1)}
          </span>
        </div>
      </div>

      <h2 className={classes.itemsTitle}>Order Items</h2>
      <div className={classes.orderItems}>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const { quantity, product, selectedAttributes } = item
            const metaImage = product.meta?.image

            return (
              <div className={classes.itemCard} key={index}>
                <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                  {!metaImage && <span className={classes.placeholder}>No image</span>}
                  {metaImage && typeof metaImage !== 'string' && (
                    <Media
                      className={classes.media}
                      imgClassName={classes.image}
                      resource={metaImage}
                      fill
                    />
                  )}
                </Link>
                <div className={classes.itemDetails}>
                  <h3 className={classes.itemTitle}>
                    <Link href={`/products/${product.slug}`}>{product.title}</Link>
                  </h3>
                  <p className={classes.itemTitle}>Attributes: {selectedAttributes}</p>
                  <p className={classes.itemQuantity}>Quantity: {quantity}</p>
                  <Price product={product} button={false} quantity={quantity} />
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Order ${id}`,
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}
