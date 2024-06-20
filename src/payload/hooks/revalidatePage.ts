import NodeCache from 'node-cache'
import type { Payload } from 'payload'
import type { AfterChangeHook } from 'payload/dist/collections/config/types'

// Create a new cache instance
const cache = new NodeCache()

// Define the cache keys
const PAGES_CACHE_KEY = 'pages'
const CATEGORIES_CACHE_KEY = 'categories'

// Cache time-to-live (TTL) in seconds (e.g., 1 hour)
const CACHE_TTL = 360

// Function to get data from cache or fetch and cache it
async function getCachedData<T>(key: string, fetchFunction: () => Promise<T>): Promise<T> {
  const cachedData = cache.get<T>(key)

  if (cachedData) {
    console.log(`Returning cached data for key: ${key}`)
    return cachedData
  }

  console.log(`Fetching fresh data for key: ${key}`)
  const freshData = await fetchFunction()
  cache.set(key, freshData, CACHE_TTL)
  return freshData
}

// Function to invalidate cache
function invalidateCache(key: string): void {
  cache.del(key)
}

// Function to handle cache invalidation for specific pages
function invalidatePageCache(slug: string): void {
  const pageKey = `${PAGES_CACHE_KEY}_${slug}`
  invalidateCache(pageKey)
}

// Function to handle cache invalidation for all pages
function invalidateAllPageCaches(): void {
  const keys = cache.keys()
  keys.forEach(key => {
    if (key.startsWith(PAGES_CACHE_KEY)) {
      invalidateCache(key)
    }
  })
}

// ensure that the home page is revalidated at '/' instead of '/home'
export const formatAppURL = ({ doc }: { doc: { slug: string } }): string => {
  const pathToUse = doc.slug === 'home' ? '' : doc.slug
  const { pathname } = new URL(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${pathToUse}`)
  return pathname
}

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
export const revalidatePage: AfterChangeHook = ({ doc, req }) => {
  const revalidate = async (): Promise<void> => {
    let url

    try {
      url = formatAppURL({ doc })
      const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&revalidatePath=${url}`,
      )

      if (res.ok) {
        req.payload.logger.info(`Revalidated path ${url}`)
        invalidatePageCache(doc.slug) // Invalidate the cache for the updated page
      } else {
        req.payload.logger.error(`Error revalidating path ${url}`)
      }
    } catch (err: unknown) {
      req.payload.logger.error(`Error hitting revalidate route for ${url}`)
    }
  }

  void revalidate()

  return doc
}

export const revalidate = async (args: {
  collection: string
  slug: string
  payload: Payload
}): Promise<void> => {
  const { collection, slug, payload } = args

  try {
    const res = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`,
    )

    if (res.ok) {
      payload.logger.info(`Revalidated page '${slug}' in collection '${collection}'`)
      invalidatePageCache(slug) // Invalidate the cache for the updated page
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${res}`,
      )
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`,
    )
  }
}

export {
  CATEGORIES_CACHE_KEY,
  getCachedData,
  invalidateAllPageCaches,
  invalidateCache,
  invalidatePageCache,
  PAGES_CACHE_KEY,
}
