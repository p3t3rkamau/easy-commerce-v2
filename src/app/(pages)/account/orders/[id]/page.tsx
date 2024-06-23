import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../../payload/payload-types'
import { HR } from '../../../../_components/HR'
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

  let order: Order | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <div>
      <h5>
        {`Order`}
        <span className={classes.id}>{` ${order.id}`}</span>
      </h5>
      <div className={classes.itemMeta}>
        {order && (
          <>
            <p>{`ID: ${order.id}`}</p>
            <p>{`Payment Intent: ${order.mpesaTransactionRef}`}</p>
            <p>{`Delivery: ${order.DeliveryLocation}`}</p>
            <p>{`Ordered On: ${formatDateTime(order.createdAt)}`}</p>
            <p className={classes.total}>
              {'Total: '}
              {new Intl.NumberFormat('KES', {
                style: 'currency',
                currency: 'Ksh',
              }).format(order.total / 1)}
            </p>
          </>
        )}
      </div>

      <div className={classes.order}>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, meta },
            } = item

            const metaImage = meta?.image

            return (
              <div className={classes.flex} key={index}>
                <Fragment>
                  <div className={classes.row}>
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
                    <div className={classes.rowContent}>
                      <h6 className={classes.title}>
                        <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                          {title}
                        </Link>
                      </h6>
                      <p>{`Quantity: ${quantity}`}</p>
                      <Price product={product} button={false} quantity={quantity} />
                    </div>
                  </div>
                </Fragment>
              </div>
            )
          }

          return null
        })}
      </div>
      <HR className={classes.hr} />
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
