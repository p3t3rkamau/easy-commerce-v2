import React from 'react'

import './index.scss'

interface CardProps {
  image: string
  title: string
  price: string
  oldPrice?: string
}

const Card: React.FC<CardProps> = ({ image, title, price, oldPrice }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <div className="card-price">
          <span className="card-new-price">{price}</span>
          {oldPrice && <span className="card-old-price">{oldPrice}</span>}
        </div>
      </div>
    </div>
  )
}

export default Card
