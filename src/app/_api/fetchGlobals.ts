import type { Footer, Header, Headercategory, Settings } from '../../payload/payload-types'
import {
  FOOTER_QUERY,
  HEADER_CATEGORIES_QUERY,
  HEADER_QUERY,
  SETTINGS_QUERY,
} from '../_graphql/globals'
import { GRAPHQL_API_URL } from './shared'

export async function fetchSettings(): Promise<Settings> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const settings = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: SETTINGS_QUERY,
    }),
  })
    ?.then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching settings')
      return res.data?.Settings
    })

  return settings
}

export async function fetchHeader(): Promise<Header> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const header = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: HEADER_QUERY,
    }),
  })
    ?.then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching header')
      return res.data?.Header
    })

  return header
}

export async function fetchFooter(): Promise<Footer> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const footer = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: FOOTER_QUERY,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      return res.data?.Footer
    })

  return footer
}

export async function fetchHeaderCategories(): Promise<any> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const headerCategories = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: HEADER_CATEGORIES_QUERY,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching header categories')
      return res.json()
    })
    .then(res => {
      if (res?.errors)
        throw new Error(res?.errors[0]?.message || 'Error fetching header categories')
      return res.data
    })
    .catch(error => {
      console.error('Fetch error:', error)
      throw error
    })

  console.log(headerCategories) // Log the fetched header categories to the console

  return headerCategories
}

export const fetchGlobals = async (): Promise<{
  settings: Settings
  header: Header
  footer: Footer

  headerCategories: Headercategory
}> => {
  // initiate requests in parallel, then wait for them to resolve
  // this will eagerly start the fetch requests at the same time
  const settingsData = fetchSettings()
  const headerData = fetchHeader()
  const footerData = fetchFooter()

  const headerCategoriesData = fetchHeaderCategories() // Add this line

  const [settings, header, footer, headerCategories]: [Settings, Header, Footer, any] =
    await Promise.all([settingsData, headerData, footerData, headerCategoriesData]) // Add headerCategoriesData

  return {
    settings,
    header,
    footer,
    headerCategories, // Add this line
  }
}
