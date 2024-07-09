import React from 'react'
import { FaSearch } from 'react-icons/fa'

import Card from '../SearchResults'

import classes from './index.module.scss'
const Trending = () => {
  return (
    <div>
      <div className={classes.trending}>
        <h5>Trending Now</h5>
        <hr />
        <ul>
          <li>
            <FaSearch className={classes.searchicon} />
            <a href="/trending1">Trending Item 1</a>
          </li>
          <li>
            <FaSearch className={classes.searchicon} />
            <a href="/trending2">Trending Item 2</a>
          </li>
          <li>
            <FaSearch className={classes.searchicon} />
            <a href="/trending3">Trending Item 3</a>
          </li>
        </ul>
      </div>
      <div className={classes.popularProducts}>
        <h5>Popular Products</h5>
        <hr />
        <div className={classes.popularProductsList}>
          {/* Replace with actual popular products */}
          <Card
            key="1"
            slug="popular-product-1"
            title="Popular Product 1"
            price={100}
            imageUrl="/assets/images/image-3.svg"
          />
          <Card
            key="2"
            slug="popular-product-2"
            title="Popular Product 2"
            price={200}
            imageUrl="/assets/images/image-3.svg"
          />
          <Card
            key="1"
            slug="popular-product-1"
            title="Popular Product 1"
            price={100}
            imageUrl="/assets/images/image-3.svg"
          />
          <Card
            key="2"
            slug="popular-product-2"
            title="Popular Product 2"
            price={200}
            imageUrl="/assets/images/image-3.svg"
          />
          <Card
            key="1"
            slug="popular-product-1"
            title="Popular Product 1"
            price={100}
            imageUrl="/assets/images/image-3.svg"
          />
          <Card
            key="2"
            slug="popular-product-2"
            title="Popular Product 2"
            price={200}
            imageUrl="/assets/images/image-3.svg"
          />
        </div>
      </div>
    </div>
  )
}

export default Trending
