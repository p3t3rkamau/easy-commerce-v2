import React, { useCallback, useEffect, useState } from 'react'
import { MdCallMade } from 'react-icons/md'

import classes from './index.module.scss'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const DocsInput: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [defaultLinks] = useState(['Puratos 1', 'Puratos 2', 'Puratos 3', 'Puratos 4', 'Puratos 5'])
  const [isSearching, setIsSearching] = useState(false)

  // Debounce function to limit the rate of API calls
  const debounce = (func, wait) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  const fetchResults = useCallback(
    debounce(async searchQuery => {
      if (searchQuery) {
        setIsSearching(true)
        // Make API call to Payload CMS
        try {
          const response = await fetch(`/api/documents?search=${searchQuery}`)
          const data = await response.json()
          setResults(data.docs)
        } catch (error) {
          console.error('Error fetching documents:', error)
        }
        setIsSearching(false)
      } else {
        setResults([])
      }
    }, 300),
    [],
  )

  useEffect(() => {
    fetchResults(query)
  }, [query, fetchResults])

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
      <div className={classes.header}>Search For Documents</div>
      <div className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            className={classes.searchTerm}
            placeholder="Search for Help"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div>
        {isSearching ? (
          <div className={classes.loading}>Searching...</div>
        ) : (
          <div className={classes.results}>
            {query
              ? results.map(doc => (
                  <div key={doc.id} className={classes.resultItem}>
                    {doc.title}
                  </div>
                ))
              : defaultLinks.map((link, index) => (
                  <div key={index} className={classes.resultItem}>
                    <div className={classes.searchFlex}>
                      <div>{link}</div>
                      <div>
                        <MdCallMade />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocsInput
