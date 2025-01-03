import React, { useCallback } from "react"
import { SortByProps } from "../types"

const SortBy: React.FC<SortByProps> = ({ sortOption, order, onSortChange }) => {
  const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value)
  }, [onSortChange])

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="font-semibold text-gray-700">
        Sort By:
      </label>
      <select
        id="sort"
        value={`${sortOption}-${order}`}
        onChange={handleSortChange}
        className="border border-gray-300 p-2 rounded-md"
        aria-label="Sort options"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  )
}

export default React.memo(SortBy)
