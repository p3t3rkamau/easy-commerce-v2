import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

import classes from './index.module.scss'

interface SearchViewProps {
  closeSearchView: () => void
}

const SearchView: React.FC<SearchViewProps> = ({ closeSearchView }) => {
  return (
    <div className={classes.searchView}>
      <button onClick={closeSearchView} className={classes.closeButton}>
        <FaArrowLeft />
      </button>
      <input type="text" placeholder="Search..." className={classes.searchInput} />
      <div className={classes.categories}>
        <h2>New & Featured</h2>
        {/* Add your categories and featured items here */}
        <div className={classes.category}>
          <h3>Categories</h3>
          <button>All</button>
          <button>Men</button>
          <button>Women</button>
          <button>Sale</button>
        </div>
      </div>
    </div>
  )
}

export default SearchView
