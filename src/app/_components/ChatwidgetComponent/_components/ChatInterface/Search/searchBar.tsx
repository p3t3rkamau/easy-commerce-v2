import React, { useState } from 'react'
import { FaChevronRight, FaSearch } from 'react-icons/fa'
import axios from 'axios'
import Link from 'next/link'

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
                {results.map(result => (
                  <li key={result._id}>
                    <Link href={`/products/${result.slug}`} className={classes.link}>
                      <div className={classes.card}>
                        <div className={classes.imageContainer}>
                          <img
                            src={result.meta?.image?.imagekit?.url}
                            alt={result.title}
                            className={classes.image}
                          />
                        </div>
                        <div className={classes.cardBody}>
                          <h3 className={classes.title}>{result.title}</h3>
                          <p className={classes.price}>Price: ${result.price}</p>
                          <Link href={`/products/${result.slug}`}>
                            <span className={classes.link}>
                              View Product <FaChevronRight />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchBar
