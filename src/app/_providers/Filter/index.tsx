'use client'

import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

interface Product {
  id: string
  price: number
}

interface IContextType {
  categoryFilters: string[]
  setCategoryFilters: React.Dispatch<SetStateAction<string[]>>
  sort: string
  setSort: React.Dispatch<SetStateAction<string>>
  priceRange: { min: number; max: number }
  setPriceRange: React.Dispatch<SetStateAction<{ min: number; max: number }>>
  priceFilteredProducts: string[]
  setPriceFilteredProducts: React.Dispatch<SetStateAction<string[]>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  sort: '',
  setSort: () => '',
  priceRange: { min: 0, max: 0 },
  setPriceRange: () => ({ min: 0, max: 0 }),
  priceFilteredProducts: [],
  setPriceFilteredProducts: () => [],
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [sort, setSort] = useState('-createdAt')
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 })
  const [priceFilteredProducts, setPriceFilteredProducts] = useState<string[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?limit=1000`,
        )
        const data = await response.json()
        setAllProducts(data.docs.map((product: any) => ({ id: product.id, price: product.price })))
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    // Filter products based on price range
    const filteredProducts = allProducts.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max,
    )
    setPriceFilteredProducts(filteredProducts.map(product => product.id))
  }, [priceRange, allProducts])

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
        priceRange,
        setPriceRange,
        priceFilteredProducts,
        setPriceFilteredProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
