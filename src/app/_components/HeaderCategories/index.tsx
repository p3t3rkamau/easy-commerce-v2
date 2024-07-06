'use client'

import React, { useEffect, useState } from 'react'

import { Headercategory } from '../../../payload/payload-types'
import { fetchHeaderCategories } from '../../_api/fetchGlobals'

import classes from './index.module.scss'

export const HeaderCategories: React.FC = () => {
  const [categories, setCategories] = useState<Headercategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHeaderCategories()
        setCategories(data.categories)
      } catch (error) {
        console.error('Error fetching header categories:', error)
      }
    }
    fetchData()
  }, [])

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(prev => (prev === categoryName ? null : categoryName))
  }

  return (
    <>
      <div className={classes.headerCategories}>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={classes.category}>
            <div
              className={`${classes.categoryName} ${
                activeCategory === category.Category ? classes.active : ''
              }`}
              onClick={() => handleCategoryClick(category.Category)}
            >
              {category.Category}
            </div>
            {activeCategory === category.Category && (
              <div className={classes.subcategoriesContainer}>
                <div className={classes.subcategories}>
                  {category.Subcategory.map((subcategory, subcategoryIndex) => (
                    <div key={subcategoryIndex} className={classes.subcategory}>
                      <img
                        src={subcategory.SubcategoryImage} // Adjust this if you have a specific way to handle the image URL
                        alt={subcategory.Name}
                        className={classes.subcategoryImage}
                      />
                      <div className={classes.subcategoryName}>{subcategory.Name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.scallopEdge}></div>
    </>
  )
}

export default HeaderCategories
