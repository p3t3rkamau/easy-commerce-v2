import axios from 'axios'
import NodeCache from 'node-cache'
import payload from 'payload'

import { API_KEY, API_LINK } from '../config/enviroments'

const cache = new NodeCache()

export const searchMongoDB = async (searchQuery: string) => {
  try {
    const requestBody = {
      collection: 'products',
      database: 'test',
      dataSource: 'Cluster0',
      filter: { title: { $regex: searchQuery, $options: 'i' } },
      projection: {
        title: 1,
        slug: 1,
        price: 1,
        meta: 1,
      },
    }

    const response = await axios.post(API_LINK, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': API_KEY,
      },
    })

    const searchResults = response.data.documents || []
    return searchResults
  } catch (error: unknown) {
    console.error('Error searching products:', error)
    throw error
  }
}

export const saveSearchTerm = async (term: string) => {
  try {
    const existingTerm = await payload.find({
      collection: 'searchTerms',
      where: {
        term: {
          equals: term,
        },
      },
    })

    if (existingTerm.totalDocs > 0) {
      await payload.update({
        collection: 'searchTerms',
        id: existingTerm.docs[0].id,
        data: {
          count: existingTerm.docs[0].count + 1,
          lastSearched: new Date(),
        },
      })
    } else {
      await payload.create({
        collection: 'searchTerms',
        data: {
          term,
          count: 1,
          lastSearched: new Date(),
        },
      })
    }
  } catch (error: unknown) {
    console.error('Error saving search term:', error)
  }
}
