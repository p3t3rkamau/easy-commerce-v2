import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'

import Card from './SearchResults'

import classes from './index.module.scss'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const searchBarRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsFocused(true)
  }

  const handleSearchClick = () => {
    fetchSearchResults()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchSearchResults()
    }
  }

  const fetchSearchResults = async () => {
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

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
      setIsFocused(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleBlur)
    return () => {
      document.removeEventListener('mousedown', handleBlur)
    }
  }, [])

  return (
    <div className={classes.container} ref={searchBarRef}>
      <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            className={classes.searchTerm}
            placeholder="Search?"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
          />
          <button onClick={handleSearchClick} className={classes.searchButton}>
            <FaSearch className={classes.searchicon} />
          </button>
        </div>
      </div>
      {error && <div className={classes.error}>{error}</div>}
      {isFocused && (
        <div className={classes.resultsContainer}>
          {isLoading && <div className={classes.loading}>Loading...</div>}
          {!isLoading && results?.length > 0 && (
            <div className={classes.searchResult}>
              {results.map(result => (
                <Card
                  key={result._id}
                  title={result.title}
                  price={result.price}
                  imageUrl={result.meta?.image?.imagekit?.url || '/Easy-logo.svg'}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
