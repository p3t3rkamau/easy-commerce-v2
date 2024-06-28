// FeaturedCards.tsx
import React from 'react'
import Link from 'next/link'

import Card from './Card'

import classes from './index.module.scss'

interface FeaturedCardsProps {
  featuredItems: any[]
}

const FeaturedCards: React.FC<FeaturedCardsProps> = ({ featuredItems }) => {
  return (
    <>
      <div className={classes.headerContainer}>
        <h4 className={classes.header}>New & Featured</h4>
        <div>
          <Link href="/products">See All</Link>
        </div>
      </div>
      <div className={classes.featuredContainer}>
        {featuredItems.map(item => (
          <Card
            key={item._id}
            slug={item.slug}
            title={item.title}
            price={item.price}
            imageUrl={item.meta?.image?.imagekit?.url || '/Easy-logo.svg'}
          />
        ))}
      </div>
    </>
  )
}

export default FeaturedCards
