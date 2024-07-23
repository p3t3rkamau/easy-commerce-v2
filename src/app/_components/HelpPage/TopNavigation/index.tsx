import React from 'react'

import styles from './index.module.scss'

interface TopNavigationProps {
  onSelect: (item: string) => void
  active: string
}

const navItems = [
  { name: 'Place an Order', icon: '🛍️' },
  { name: 'Pay for Your Order', icon: '💳' },
  { name: 'Track Your Order', icon: '🚚' },
  { name: 'Cancel an Order', icon: '❌' },
  { name: 'Create a Return', icon: '↩️' },
]

const TopNavigation: React.FC<TopNavigationProps> = ({ onSelect, active }) => {
  return (
    <nav className={styles.topNav}>
      {navItems.map(item => (
        <button
          key={item.name}
          className={`${styles.navItem} ${active === item.name ? styles.active : ''}`}
          onClick={() => onSelect(item.name)}
        >
          <span className={styles.icon}>{item.icon}</span>
          {item.name}
        </button>
      ))}
    </nav>
  )
}

export default TopNavigation
