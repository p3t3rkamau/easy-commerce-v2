import React, { useEffect, useRef, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import axios from 'axios'

import ErrorDisplay from '../SearchBar/ErrorDisplay'
import LoadingCard from '../SearchBar/LoadingCard'
import Card from '../SearchBar/SearchResults'
import Trending from '../SearchBar/Sponsored'
import FeaturedCards from './featuredCards'
import Filters from './Filters'

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
      }, 1000)
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
      const fetchedResults = response.data.results
      const enrichedResults = await Promise.all(
        fetchedResults.map(async result => {
          const imageResponse = await axios.get(`/api/products/${result._id}`)
          return {
            ...result,
            imageUrl: imageResponse.data.meta.image.imagekit.url,
          }
        }),
      )
      setResults(enrichedResults)
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

  const handleCardClick = () => {
    closeSearchView()
  }

  return (
    <div className={classes.searchView} ref={searchBarRef}>
      <div className={classes.searchFlex}>
        <div className={classes.greetings}>Hello, Peter</div>
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
      {/* <FeaturedCards featuredItems={featuredItems} />
      <Filters /> */}

      {isFocused && query.trim() !== '' && (
        <div className={classes.resultsContainer}>
          {error && <ErrorDisplay />} {/* Use the ErrorDisplay component here */}
          {isLoading && (
            <div className={classes.loading}>
              <LoadingCard imageUrl={''} />
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
                  imageUrl={result.imageUrl || '/Easy-logo.svg'}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {isFocused && query.trim() === '' && (
        <div className={classes.suggestionsContainer}>
          <Trending />
        </div>
      )}
    </div>
  )
}

export default SearchView
