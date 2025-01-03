import React, { memo, useState, useEffect, useCallback } from "react"
import { FiSearch, FiX } from "react-icons/fi"
import { Product, SearchBarProps } from "../types"
import { useSearchSuggestions } from "../hooks"
import { useNavigate, Link } from "react-router-dom"
import { debounce } from "lodash"

const MAX_SUGGESTIONS = 10

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const [query, setQuery] = useState(searchQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const { data: suggestions } = useSearchSuggestions(debouncedQuery)
  const navigate = useNavigate()

  const debouncedSetQuery = useCallback(
    (value: string) => {
      debounce(() => {
        setDebouncedQuery(value)
      }, 500)()
    },
    []
  )

  useEffect(() => {
    setQuery(searchQuery)
    debouncedSetQuery(searchQuery)
  }, [searchQuery, debouncedSetQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearchChange(e)
    debouncedSetQuery(value)
  }

  const handleClearInput = () => {
    setQuery("")
    onSearchChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
    setDebouncedQuery("")
  }

  const handleSuggestionClick = (productId: string) => {
    navigate(`/products/${productId}`)
  }

  const groupedSuggestions = suggestions?.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>) || {}

  return (
    <div className="flex-grow mx-4 relative" role="search">
      <FiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none text-sm"
        aria-label="Search"
        data-testid="search-input"
      />
      {query && (
        <FiX
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          aria-hidden="true"
          data-testid="clear-input"
          onClick={handleClearInput}
        />
      )}
      {debouncedQuery && suggestions && suggestions.length > 0 ? (
        <ul
          className="absolute left-0 right-0 max-h-80 overflow-y-auto bg-white border border-gray-200 mt-1 rounded-md shadow-lg z-10 sm:max-w-full sm:w-full"
          data-testid="suggestions-list"
        >
          {Object.entries(groupedSuggestions).map(([category, products]) => (
            <li key={category} className="border-b last:border-b-0">
              <div className="px-4 py-2 bg-gray-100 font-semibold">{category}</div>
              {products.slice(0, MAX_SUGGESTIONS).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.id.toString())}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-8 h-8 object-cover mr-2"
                  />
                  {product.title}
                </button>
              ))}
            </li>
          ))}
        </ul>
      ) : debouncedQuery && (
        <div className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 rounded-md shadow-lg z-10 px-4 py-2 sm:max-w-full sm:w-full">
          No products found. <Link to="/products" className="text-blue-500">View all products</Link>
        </div>
      )}
    </div>
  )
}

export default memo(SearchBar)
