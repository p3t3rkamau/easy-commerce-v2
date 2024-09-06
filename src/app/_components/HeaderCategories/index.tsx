'use client'
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Image from 'next/image'

import classes from './index.module.scss'

interface Attribute {
  id: string
  Name: string
}

interface Subcategory {
  id: string
  Name: string
  SubcategoryImage: {
    imagekit: {
      url: string
    }
  }
  Attribute: {
    id: string
    Name: string
  }
}

interface Category {
  Category: string
  Subcategory: Subcategory[]
}

interface HeaderCategoriesLayoutProps {
  HeaderCategories: Category[]
}

export const HeaderCategoriesLayout: React.FC<HeaderCategoriesLayoutProps> = ({
  HeaderCategories,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(prev => (prev === categoryName ? null : categoryName))
  }

  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerCategories}>
        {HeaderCategories?.map((category: Category, categoryIndex: number) => (
          <div
            key={categoryIndex}
            className={`${classes.category} ${
              activeCategory === category.Category ? classes.active : ''
            }`}
            onClick={() => handleCategoryClick(category.Category)}
          >
            {category.Category}
            {activeCategory === category.Category ? (
              <FaChevronUp className={classes.icon} />
            ) : (
              <FaChevronDown className={classes.icon} />
            )}
          </div>
        ))}
      </div>
      {HeaderCategories?.map((category: Category, categoryIndex: number) => (
        <div
          key={categoryIndex}
          className={`${classes.dropdown} ${
            activeCategory === category.Category ? classes.show : ''
          }`}
        >
          <div className={classes.subcategoriesContainer}>
            {category?.Subcategory?.map((subcategory: Subcategory, subcategoryIndex: number) => (
              <div key={subcategoryIndex} className={classes.subcategory}>
                <Image
                  src={subcategory.SubcategoryImage.imagekit.url}
                  alt={subcategory.Name}
                  className={classes.subcategoryImage}
                  width={100}
                  height={100}
                />
                <div className={classes.subcategoryName}>{subcategory.Name}</div>
                <div className={classes.attributesContainer}>
                  {subcategory.Attribute.map((attribute: Attribute, attributeIndex: number) => (
                    <div key={attributeIndex} className={classes.attributeName}>
                      {attribute.Name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeaderCategoriesLayout
