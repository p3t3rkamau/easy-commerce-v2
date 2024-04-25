'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

import classes from './index.module.scss'

const Categories = ({ categories }: { categories: Category[] }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      // Check the window width and update the isSmallScreen state
      setIsSmallScreen(window.innerWidth <= 767)
    }
    // Initial check on component mount
    handleResize()
    // Attach resize event listener
    window.addEventListener('resize', handleResize)
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Adjust the number of displayed categories based on screen size
  const numberOfCategories = isSmallScreen ? 6 : 12
  // Take the first `numberOfCategories` elements
  const displayedCategories = categories?.slice(0, numberOfCategories)

  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop by Categories</h3>
        <Link href="/products">Show All</Link>
      </div>
      <div className={classes.list}>
        {displayedCategories?.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default Categories
