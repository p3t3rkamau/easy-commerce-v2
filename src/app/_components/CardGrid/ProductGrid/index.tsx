import React from 'react'

import Card from '../index'

import '../index.scss'

const dummyData = [
  {
    image: '/assets/images/image-1.svg',
    title: 'Vitron 2.1 CH Multimedia Speaker',
    price: 'KSH 5,299',
    oldPrice: '7,999',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Samsung Galaxy A15, 6.5", 128GB + 4GB',
    price: 'KSH 16,599',
    oldPrice: '20,112',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'VON 4 Gas Cooker + Gas Oven',
    price: 'KSH 19,499',
    oldPrice: '30,995',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'TECNO POP 8, 6.6", 128GB ROM + 4G',
    price: 'KSH 11,348',
    oldPrice: '18,997',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Nunix Hair Blow Dryer',
    price: 'KSH 899',
    oldPrice: '1,399',
  },
  {
    image: '/assets/images/image-1.svg',
    title: '3-Pack Round Neck Heavy Duty T-shirts',
    price: 'KSH 789',
    oldPrice: '900',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Handbags',
    price: 'Starting From KSH 500',
  },
  {
    image: '/assets/images/image-1.svg',
    title: "Men's shoes",
    price: 'Starting From KSH 499',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Fridges',
    price: 'Starting From KSH 17,499',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Laptops',
    price: 'Starting From KSH 13,599',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Smart Tvs',
    price: 'KSH 10,999',
  },
  {
    image: '/assets/images/image-1.svg',
    title: 'Water dispensers',
    price: 'Starting From KSH 3,299',
  },
]

const ProductGrid: React.FC = () => {
  return (
    <div className="gridCardContainer">
      <div className="gridHeader">Top Deals For You | Shop Now</div>
      <div className="product-grid">
        {dummyData.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            price={item.price}
            oldPrice={item.oldPrice}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
