// SearchView.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import axios from 'axios'

import Card from '../SearchBar/SearchResults'
import FeaturedCards from './featuredCards'
import Filters from './Filters'

import LoadingCircle from '@/app/NextUi_components/loadingCircle'

import classes from './index.module.scss'

interface SearchViewProps {
  closeSearchView: () => void
}

const SearchView: React.FC<SearchViewProps> = ({ closeSearchView }) => {
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
      }, 3000)
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
      console.log(response.data.results)
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

  // Mock data for featured items
  const featuredItems = [
    {
      _id: '1',
      slug: 'featured-1',
      title: 'Featured Product 1',
      price: 100,
      meta: { image: { imagekit: { url: '/assets/images/image-1.svg' } } },
    },
    {
      _id: '2',
      slug: 'featured-2',
      title: 'Featured Product 2',
      price: 200,
      meta: { image: { imagekit: { url: '/assets/images/image-2.svg' } } },
    },
  ]

  return (
    <div className={classes.searchView} ref={searchBarRef}>
      <div className={classes.searchFlex}>
        <div className={classes.greetings}>Hello, Peter</div>
        {/* TODO: add user name in the greetings */}
        <div>
          <button onClick={closeSearchView} className={classes.closeButton}>
            <FaTimes />
          </button>
        </div>
      </div>
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
        </div>
        <button onClick={() => fetchSearchResults(query)} className={classes.searchButton}>
          <FaSearch className={classes.searchIcon} />
        </button>
      </div>
      <FeaturedCards featuredItems={featuredItems} />
      <Filters />

      {isFocused && query.trim() !== '' && (
        <div className={classes.resultsContainer}>
          {error && <div className={classes.error}>{error}</div>}
          {isLoading && (
            <div className={classes.loading}>
              <LoadingCircle />
              {/* Searching {query}... */}
            </div>
          )}
          {!isLoading && results?.length > 0 && (
            <div className={classes.searchResult}>
              {results.map(result => (
                <Card
                  key={result._id}
                  slug={result.slug}
                  title={result.title}
                  price={result.price}
                  imageUrl={result.meta?.image || '/Easy-logo.svg'}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchView
