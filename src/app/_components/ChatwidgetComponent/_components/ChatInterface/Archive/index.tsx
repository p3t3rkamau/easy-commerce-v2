import React from 'react'

import ProductCard from '../ProductCard'

import classes from './index.module.scss'
const ArchiveBlock = () => {
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

export default ArchiveBlock
