import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import axios from 'axios'

import Card from './SearchResults'

import classes from './index.module.scss'

const SearchBar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const searchBarRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (value.trim() !== '') {
      debounceTimeoutRef.current = setTimeout(() => {
        fetchSearchResults(value)
      }, 3000) // Adjust the delay as needed
    } else {
      setResults([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchSearchResults(query)
    }
  }

  const fetchSearchResults = async (searchQuery: string) => {
    if (searchQuery.trim() === '') return

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/search', { query: searchQuery })
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
            placeholder="What Are You Looking For?"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
          />
          <button onClick={() => fetchSearchResults(query)} className={classes.searchButton}>
            <FaSearch className={classes.searchicon} />
          </button>
        </div>
      </div>
      {/* <button onClick={onClose} className={classes.closeButton}>
        <FaTimes className={classes.closeIcon} />
      </button> */}

      {isFocused && query.trim() !== '' && (
        <div className={classes.resultsContainer}>
          {error && <div className={classes.error}>{error}</div>}
          {isLoading && <div className={classes.loading}>Searching {query}...</div>}
          {!isLoading && results?.length > 0 && (
            <div className={classes.searchResult}>
              {results.map(result => (
                <Card
                  key={result._id}
                  slug={result.slug}
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
