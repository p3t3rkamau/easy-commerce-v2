import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useToast } from '../../../_providers/Toast/ToastContext'

import classes from './index.module.scss'

interface CardProps {
  title: string
  price: number
  imageUrl: string
  slug: string
  onCardClick: () => void // Add onCardClick prop
}

const Card: React.FC<CardProps> = ({ title, price, imageUrl, slug, onCardClick }) => {
  const router = useRouter()
  const { addToast } = useToast() // Get the addToast function from context

  const handleViewProduct = () => {
    addToast(`Loading... ${title}`, 'info') // Show toast with loading message
    // Call onCardClick before navigating
    onCardClick()
    // Navigate to the product page after a short delay to ensure toast is visible
    router.push(`/products/${slug}`)
  }

  return (
    <div className={classes.card}>
      <div className={classes.imageContainer}>
        <Image src={imageUrl} width={300} height={300} alt={title} className={classes.image} />
      </div>
      <div className={classes.cardBody}>
        <span className={classes.title}>{title}</span>
        <p className={classes.price}>Price: Ksh{price}</p>
        <button onClick={handleViewProduct} className={classes.link}>
          View Product <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Card
