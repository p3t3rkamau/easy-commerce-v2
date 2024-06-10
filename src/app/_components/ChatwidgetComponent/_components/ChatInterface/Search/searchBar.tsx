import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa6'
import { MdCloseFullscreen } from 'react-icons/md'

import { Media } from '../../../../Media'

import classes from './index.module.scss'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            className={classes.searchTerm}
            placeholder="What are you looking for"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div>
        <div className={classes.mostsearched}>
          <ul>
            <li>Puratos</li>
            <li>Cake Laveler</li>
            <li>Mixing Bowl</li>
            <li>Pearl Ribbon</li>
            <li>Puratos</li>
            <li>Cake Laveler</li>
            <li>Miing Bowl</li>
            <li>Pearl Ribbon</li>
          </ul>
        </div>
        <div className={classes.searchResult}>
          <ul>
            <li>
              <div className={classes.searchFlex}>
                <div>Puratos</div>
                <div>
                  <Media resource="/Easy-logo.svg" imgClassName={classes.SearchResultImage} />
                </div>
                <div>
                  <FaChevronRight />
                </div>
              </div>
            </li>
            <li>
              <div className={classes.searchFlex}>
                <div>Puratos</div>
                <div>
                  <Media resource="/Easy-logo.svg" imgClassName={classes.SearchResultImage} />
                </div>
                <div>
                  <FaChevronRight />
                </div>
              </div>
            </li>
            <li>
              <div className={classes.searchFlex}>
                <div>Puratos</div>
                <div>
                  <Media resource="/Easy-logo.svg" imgClassName={classes.SearchResultImage} />
                </div>
                <div>
                  <FaChevronRight />
                </div>
              </div>
            </li>
            <li>
              <div className={classes.searchFlex}>
                <div>Puratos</div>
                <div>
                  <Media resource="/Easy-logo.svg" imgClassName={classes.SearchResultImage} />
                </div>
                <div>
                  <FaChevronRight />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
