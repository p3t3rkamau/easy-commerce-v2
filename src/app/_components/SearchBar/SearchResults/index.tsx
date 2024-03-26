'use client'
import React, { useState } from 'react'
import axios from 'axios'

import SearchBar from '../searchBar'

// ... (other imports)
const SearchResults: React.FC = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState<string[]>([]) // Initialize with an empty array

  const handleSearch = async (searchQuery: string) => {
    try {
      setLoading(true)
      setQuery(searchQuery)

      // Use Axios to send a request to the server's MongoDB search API
      const response = await axios.post('/api/search', { query: searchQuery })

      if (response.data.success) {
        const results = response.data.results || [] // Assuming your API returns
        console.log('API Response:', results)
        setSearchResults(results) // Update searchResults state
      } else {
        setError(response.data.error || 'Unknown error')
      }

      setLoading(false)
    } catch (error) {
      // Handle errors
      setLoading(false)
      setError(error.message || 'Unknown error')
    }
  }

  return (
    <div>
      {/* Your Search Bar component with onSearch callback */}
      <SearchBar onSearch={handleSearch} />

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p>Error: {error}</p>}

      {/* Display search results */}
      {!loading && !error && (
        <ul>
          {searchResults.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchResults
