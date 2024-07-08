'use client'
import React from 'react'
import Link from 'next/link'

import classes from './index.module.scss'
interface OrderActionsProps {
  orderDetails: Array<{ label: string; value: string }>
  orderItems: Array<{ product: { title: string }; quantity: number; selectedAttributes: string }>
  total: number
  id: string
}

const OrderActions: React.FC<OrderActionsProps> = ({ orderDetails, orderItems, total, id }) => {
  const shareToWhatsApp = () => {
    const phoneNumber = '254795820643' // Replace with your actual WhatsApp business number
    const message = `Order Details:
${orderDetails.map(({ label, value }) => (value ? `${label}: ${value}` : '')).join('\n')}
Total: ${new Intl.NumberFormat('KES', { style: 'currency', currency: 'Ksh' }).format(total / 1)}

Order Items:
${orderItems
  .map(
    item =>
      `${item.product.title} - Quantity: ${item.quantity} - Attributes: ${item.selectedAttributes}`,
  )
  .join('\n')}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className={classes.actionButtons}>
      <button onClick={shareToWhatsApp} className={classes.shareButton}>
        Share Order
      </button>
      <Link href={`/track-order/${id}`} className={classes.trackButton}>
        Track Order
      </Link>
    </div>
  )
}

export default OrderActions
