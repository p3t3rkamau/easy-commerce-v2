'use client'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa6'
import axios from 'axios'
import Link from 'next/link'

import SearchResultsArchiveBlock from '../Archive/SearchResultsArchive'

import classes from './index.module.scss'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = e => {
    setQuery(e.target.value)
  }

  const handleSearch = async () => {
    if (query.trim() === '') return

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/search', { query })
      setResults(response.data.results)
    } catch (error) {
      setError('Error searching products')
      console.error('Error searching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch()
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
            disabled={isLoading}
          />
          <span className={classes.searchIcon} onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Loading...' : <FaSearch />}
          </span>
        </div>
      </div>
      <div className={classes.mostsearched}>
        <ul>
          <li onClick={() => setQuery('Puratos')}>Puratos</li>
          <li onClick={() => setQuery('Cake Leveler')}>Cake Leveler</li>
          <li onClick={() => setQuery('Mixing Bowl')}>Mixing Bowl</li>
          <li onClick={() => setQuery('Pearl Ribbon')}>Pearl Ribbon</li>
        </ul>
      </div>
      {error && <div className={classes.error}>{error}</div>}
      {results?.length > 0 && (
        <>
          <div className={classes.container}>
            <div className={classes.searchResult}>
              <ul>
                {results?.map(result => (
                  <li key={result._id}>
                    <Link href="/products" className={classes.link}>
                      <div className={classes.searchFlex}>
                        <div>{result.title}</div>
                        <div>
                          <FaChevronRight />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <SearchResultsArchiveBlock />
          </div>
        </>
      )}
    </div>
  )
}

export default SearchBar
