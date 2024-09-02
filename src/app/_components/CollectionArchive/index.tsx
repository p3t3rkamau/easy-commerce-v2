'use client'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import { Post, Product } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'
import { useFilter } from '../../_providers/Filter'
import Card from '../Card'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'

import classes from './index.module.scss'

type Result = {
  totalDocs: number
  docs: (Post | Product | string)[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

export type Props = {
  className?: string
  relationTo?: 'posts' | 'products'
  populateBy?: 'collection' | 'selection'
  showPageRange?: boolean
  onResultChange?: (result: Result) => void
  limit?: number
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  selectedDocs?: ArchiveBlockProps['selectedDocs']
  categories?: ArchiveBlockProps['categories']
}

export const CollectionArchive: React.FC<Props> = props => {
  const { categoryFilters, sort, priceFilteredProducts } = useFilter()

  const {
    className,
    relationTo,
    populateBy,
    showPageRange,
    selectedDocs,
    onResultChange,
    limit = 10,
    populatedDocs,
    populatedDocsTotal,
  } = props

  const [results, setResults] = useState<Result>({
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    docs: (populateBy === 'collection'
      ? populatedDocs
      : populateBy === 'selection'
      ? selectedDocs
      : []
    )?.map(doc => doc.value),
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const [page, setPage] = useState(1)

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      if (hasHydrated.current) {
        setIsLoading(true)
      }
    }, 500)

    const searchQuery = qs.stringify(
      {
        sort,
        where: {
          ...(categoryFilters && categoryFilters?.length > 0
            ? {
                categories: {
                  in:
                    typeof categoryFilters === 'string'
                      ? [categoryFilters]
                      : categoryFilters.map((cat: string) => cat).join(','),
                },
              }
            : {}),
          ...(priceFilteredProducts.length > 0
            ? {
                id: {
                  in: priceFilteredProducts,
                },
              }
            : {}),
        },
        limit,
        page,
        depth: 1,
      },
      { encode: false },
    )

    const makeRequest = async () => {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
        )
        const json = await req.json()
        clearTimeout(timer)
        hasHydrated.current = true

        const { docs } = json as { docs: (Post | Product)[] }

        if (docs && Array.isArray(docs)) {
          setResults(json)
          setIsLoading(false)
          if (typeof onResultChange === 'function') {
            onResultChange(json)
          }
        }
      } catch (err) {
        console.warn(err)
        setIsLoading(false)
        setError(`Unable to load "${relationTo} archive" data at this time.`)
      }
    }

    makeRequest()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page, categoryFilters, relationTo, onResultChange, sort, limit, priceFilteredProducts])

  // Check if the window object is available (i.e., code is running on the client)
  const isClient = typeof window !== 'undefined'

  useEffect(() => {
    if (isClient && hasHydrated.current) {
      // This code will only run on the client after the component has hydrated
      console.log('Client-side code running after hydration')

      // You can add any client-specific logic here that should only run after hydration.
      // For example, updating the UI, interacting with localStorage, etc.
    }
  }, [isClient, results]) // Add any dependencies that should trigger this effect

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div ref={scrollRef} className={classes.scrollRef} />
      {!isLoading && error && <div className={classes.error}>{error}</div>}
      <Fragment>
        {showPageRange !== false && populateBy !== 'selection' && (
          <div className={classes.pageRange}>
            <PageRange
              totalDocs={results.totalDocs}
              currentPage={results.page}
              collection={relationTo}
              limit={limit}
            />
          </div>
        )}

        <div className={classes.grid}>
          {results.docs?.map((result, index) => {
            // @ts-ignore
            return <Card key={index} relationTo={relationTo} doc={result} showCategories />
          })}
        </div>

        {results.totalPages > 1 && (
          <Pagination
            className={classes.pagination}
            page={results.page}
            totalPages={results.totalPages}
            onClick={setPage}
          />
        )}
      </Fragment>
    </div>
  )
}
