import React from 'react'

import styles from './index.module.scss'

interface CategoryListProps {
  onSelectCategory: (category: string) => void
  active: string
}

const categories = [
  'Payments',
  'Buy Now Pay Later',
  'Vouchers',
  'Delivery',
  'Returns & Refunds',
  'Products',
  'Account',
  'Sell on Jumia',
  'Jumia Express',
]

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, active }) => {
  return (
    <div className={styles.categoryList}>
      {categories.map(category => (
        <button
          key={category}
          className={`${styles.categoryButton} ${active === category ? styles.active : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryList
