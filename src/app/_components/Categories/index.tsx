'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

import classes from './index.module.scss'

// Simple loading animation component (can be customized or replaced)
const LoadingSpinner = () => (
  <div className={classes.loadingSpinner}>
    <div className={classes.spinner}></div>
  </div>
)

const CategoriesComponent = ({ categories }: { categories: Category[] }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Mark the component as mounted
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 767)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!isMounted) {
    return <LoadingSpinner /> // Return loading spinner while waiting for mount
  }

  const numberOfCategories = isSmallScreen ? 6 : 12
  const displayedCategories = categories?.slice(0, numberOfCategories)

  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h4>Shop by Categories</h4>
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

export default CategoriesComponent
