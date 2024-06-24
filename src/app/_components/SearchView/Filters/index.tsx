// Filters.tsx
import React from 'react'

import classes from './index.module.scss'

const Filters: React.FC = () => {
  return (
    <div className={classes.filtersContainer}>
      <h3>Categories</h3>
      <div className={classes.categoryContainer}>
        <ul className={classes.List}>
          <li>
            <button>All</button>
          </li>
          <li>
            <button>Packaging</button>
          </li>
          <li>
            <button>Cake Toppers</button>
          </li>
          <li>
            <button>Moulds</button>
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default Filters
