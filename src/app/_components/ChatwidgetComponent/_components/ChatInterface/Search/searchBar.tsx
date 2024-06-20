import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'

import Card from './SearchCard' // Assuming your Card component is in the same directory

import classes from './index.module.scss'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = e => {
    setQuery(e.target.value)
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      fetchSearchResults()
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
          <span className={classes.searchIcon} onClick={fetchSearchResults} disabled={isLoading}>
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
        <div className={classes.searchResult}>
          {results.map(result => (
            <Card
              key={result._id}
              title={result.title}
              price={result.price}
              imageUrl={result.meta?.image?.imagekit?.url || '/Easy-logo.svg'}
              slug={result.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
