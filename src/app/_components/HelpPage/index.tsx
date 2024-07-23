'use client'
import React, { useState } from 'react'

import CategoryList from './CategoryList'
import QuestionList from './QuestionList'
import TopNavigation from './TopNavigation'

import styles from './index.module.scss'

const HelpCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Payments')
  const [selectedTopNav, setSelectedTopNav] = useState<string>('Pay for Your Order')

  return (
    <div className={styles.helpCenter}>
      <header className={styles.header}>
        <h1>Help Center</h1>
        <h2>Hi, how can we help you?</h2>
      </header>
      <TopNavigation onSelect={setSelectedTopNav} active={selectedTopNav} />
      <div className={styles.searchBar}>
        <input type="text" placeholder='Type keywords like "return"' />
      </div>
      <div className={styles.content}>
        <CategoryList onSelectCategory={setSelectedCategory} active={selectedCategory} />
        <QuestionList category={selectedCategory} topNav={selectedTopNav} />
      </div>
    </div>
  )
}

export default HelpCenter
