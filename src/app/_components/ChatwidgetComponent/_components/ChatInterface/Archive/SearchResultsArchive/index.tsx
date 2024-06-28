import React from 'react'

import ProductCard from '../../ProductCard'

import classes from './index.module.scss'
const SearchResultsArchiveBlock = () => {
  return (
    <div className={classes.flex}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default SearchResultsArchiveBlock
