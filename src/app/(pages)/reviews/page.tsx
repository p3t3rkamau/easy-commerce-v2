import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import HelpCenter from '../../_components/HelpPage/index'
import CustomerFeedback from '../../_components/Reviews/index'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default async function Help() {
  return (
    <Gutter className={classes.logout}>
      <CustomerFeedback
        productName="Puratos"
        averageRating={4.6}
        totalRatings={48}
        ratingCounts={{
          5: 39,
          4: 5,
          3: 2,
          2: 0,
          1: 2,
        }}
        reviews={[
          {
            rating: 4,
            title: 'HP charger',
            content: 'Good n working I recommend anyone.',
            author: 'ERICK',
            date: '17-07-2024',
            verified: true,
          },
          {
            rating: 5,
            title: 'It is a great product',
            content: 'It is a great product',
            author: 'misogynist',
            date: '31-05-2024',
            verified: true,
          },
          {
            rating: 5,
            title: 'perfect',
            content: 'perfect',
            author: 'Anonymous',
            date: '15-06-2024',
            verified: false,
          },
        ]}
      />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Reviews Page',
  description: 'Easy Bake Reviews Page',
  openGraph: mergeOpenGraph({
    title: 'Review Page',
    url: '/reviews',
  }),
}
