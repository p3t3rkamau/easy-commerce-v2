'use client'
'use client'

import React, { useState } from 'react'

import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'
import { useFilter } from '../../../_providers/Filter'
import BudgetFilter from '../BudgetFilter'

import classes from './index.module.scss'

interface FiltersProps {
  categories: Category[]
}

const Filters: React.FC<FiltersProps> = ({ categories }) => {
  const { categoryFilters, sort, setCategoryFilters, setSort, priceFilter, setPriceFilter } =
    useFilter()
  const [showAllCategories, setShowAllCategories] = useState(false)
  const initialDisplayCount = 3 // Number of categories to display initially

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)
      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const handleSort = (value: string) => setSort(value)

  const handlePriceChange = (value: { min: number; max: number }) => {
    setPriceFilter(value)
  }

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories)
  }

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, initialDisplayCount)

  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>Product Categories</h6>
        <div className={classes.categories}>
          {displayedCategories.map(category => {
            const isSelected = categoryFilters.includes(category.id)

            return (
              <Checkbox
                key={category.id}
                label={category.title}
                value={category.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            )
          })}
          {categories.length > initialDisplayCount && (
            <button onClick={toggleShowAllCategories} className={classes.showMoreButton}>
              {showAllCategories ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        <HR className={classes.hr} />
        <div>
          <BudgetFilter value={priceFilter} onChange={handlePriceChange} />
        </div>
        <HR className={classes.hr} />
        <h6 className={classes.title}>Sort By</h6>
        <div className={classes.categories}>
          <RadioButton
            label="Latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Oldest"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
// TODO: add brand filters