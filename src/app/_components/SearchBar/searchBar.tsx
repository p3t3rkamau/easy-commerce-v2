import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import classes from './index.module.scss'

const SearchBar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetchSuggestions = useCallback(async (value: string) => {
    if (value.trim() === '') {
      setSuggestions([])
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post('/api/search', { query: value })
      setSuggestions(
        response.data.results.map(item => ({
          label: item.title,
          value: item.slug,
        })),
      )
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(value)
      saveSearchTerm(value)
    }, 300)
  }

  const handleSelectionChange = (selected: string) => {
    if (selected) {
      if (selected === 'clear_history') {
        clearSearchHistory()
      } else {
        // Update recent searches
        const updatedSearches = [selected, ...recentSearches.filter(s => s !== selected)].slice(
          0,
          5,
        )
        setRecentSearches(updatedSearches)
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))

        // Navigate to the product page
        router.push(`/products/${selected}`)
      }
    }
  }

  const clearSearchHistory = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const saveSearchTerm = async (term: string) => {
    if (term.trim() !== '') {
      try {
        await axios.post('/api/save-search', { term })
      } catch (error) {
        console.error('Error saving search term:', error)
      }
    }
  }

  const allItems = [
    ...suggestions,
    ...recentSearches.map(s => ({ label: s, value: s })),
    { label: 'Clear Search History', value: 'clear_history' },
  ]

  return (
    <div className={classes.container}>
      <Autocomplete
        label="Search products"
        variant="bordered"
        className={classes.autocomplete}
        defaultItems={allItems}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
        inputValue={query}
        isLoading={isLoading}
        allowsCustomValue
      >
        {item => (
          <AutocompleteItem
            key={item.value}
            textValue={item.label}
            className={item.value === 'clear_history' ? classes.clearHistory : ''}
          >
            {item.value === 'clear_history' ? (
              <div className={classes.clearHistoryItem}>
                <FaTrash className={classes.trashIcon} />
                {item.label}
              </div>
            ) : (
              item.label
            )}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  )
}

export default SearchBar
