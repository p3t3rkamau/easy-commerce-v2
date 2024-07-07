import React, { useEffect, useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../../payload/payload-types'
import { Button } from '../../../../_components/Button'
import { RenderParams } from '../../../../_components/RenderParams'
import { formatDateTime } from '../../../../_utilities/formatDateTime'
import { getMeUser } from '../../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [visibleOrders, setVisibleOrders] = useState<number>(6)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const { token } = await getMeUser({
        nullUserRedirect: `/login?error=${encodeURIComponent(
          'You must be logged in to view your orders.',
        )}&redirect=${encodeURIComponent('/orders')}`,
      })

      try {
        const fetchedOrders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
          cache: 'no-store',
        })
          ?.then(async res => {
            if (!res.ok) notFound()
            const json = await res.json()
            if ('error' in json && json.error) notFound()
            if ('errors' in json && json.errors) notFound()
            return json
          })
          ?.then(json => json.docs)

        setOrders(fetchedOrders || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleLoadMore = () => {
    setVisibleOrders(prevVisibleOrders => prevVisibleOrders + 6)
  }

  return (
    <div>
      <h5>My Orders</h5>
      {loading && <p>Loading orders...</p>}
      {(!orders || orders.length === 0) && !loading && (
        <p className={classes.noOrders}>You have no orders.</p>
      )}
      <RenderParams />
      {orders && orders.length > 0 && (
        <ul className={classes.orders}>
          {orders.slice(0, visibleOrders).map(order => (
            <li key={order.id} className={classes.order}>
              <Link className={classes.item} href={`/account/orders/${order.id}`}>
                <div className={classes.itemContent}>
                  <h6 className={classes.itemTitle}>{`Order ${order.id}`}</h6>
                  <div className={classes.itemMeta}>
                    <p>
                      {'Total: '}
                      {new Intl.NumberFormat('KES', {
                        style: 'currency',
                        currency: 'Ksh',
                      }).format(order.total / 1)}
                    </p>
                    <p className={classes.orderDate}>{`Ordered On: ${formatDateTime(
                      order.createdAt,
                    )}`}</p>
                  </div>
                </div>
                <Button
                  appearance="secondary"
                  label="View Order"
                  className={classes.button}
                  el="link"
                  href={`/account/orders/${order.id}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {visibleOrders < orders.length && (
        <Button
          appearance="primary"
          label="Load More"
          className={classes.loadMoreButton}
          onClick={handleLoadMore}
        />
      )}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Your orders.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
}
