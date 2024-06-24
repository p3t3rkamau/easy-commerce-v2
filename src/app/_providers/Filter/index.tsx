'use client'

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IContextType {
  categoryFilters: string[]
  setCategoryFilters: React.Dispatch<SetStateAction<string[]>>
  sort: string
  setSort: React.Dispatch<SetStateAction<string>>
  priceFilter: { min: number; max: number }
  setPriceFilter: React.Dispatch<SetStateAction<{ min: number; max: number }>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  sort: '',
  setSort: () => '',
  priceFilter: { min: 0, max: 0 },
  setPriceFilter: () => ({ min: 0, max: 0 }),
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [sort, setSort] = useState('-createdAt')
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 0 })

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
        priceFilter,
        setPriceFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
