'use client'
import React, { useEffect, useState } from 'react'

import { fetchHeaderCategories } from '../../_api/fetchGlobals' // Adjust the import path as needed

import classes from './index.module.scss'

export interface Attribute {
  Name: string
  id: string
}

export interface Subcategory {
  Name: string
  SubcategoryImage: string
  Attribute: Attribute[]
  id: string
}

export interface Headercategory {
  id: string
  Category: string
  Subcategory: Subcategory[]
  updatedAt: string
  createdAt: string
}

export const HeaderCategories: React.FC = () => {
  const [categories, setCategories] = useState<Headercategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHeaderCategories()
        setCategories(data)
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
    <div className={classes.headerCategories}>
      {categories.map(category => (
        <div key={category.id} className={classes.category}>
          <div
            className={classes.categoryName}
            onClick={() => handleCategoryClick(category.Category)}
          >
            {category.Category}
          </div>
          {activeCategory === category.Category && (
            <div className={classes.subcategories}>
              {category.Subcategory.map(subcategory => (
                <div key={subcategory.id} className={classes.subcategory}>
                  <div className={classes.subcategoryName}>{subcategory.Name}</div>
                  <img
                    src={subcategory.SubcategoryImage}
                    alt={subcategory.Name}
                    className={classes.subcategoryImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default HeaderCategories
