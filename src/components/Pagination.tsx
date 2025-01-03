import React, { useCallback, useMemo } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { PaginationProps } from "../types"

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  limit,
  onPageChange,
}) => {
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit])

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }, [totalPages, onPageChange])

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          aria-label="Previous Page"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
        >
          Previous
        </button>
        <button
          aria-label="Next Page"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{(currentPage - 1) * limit + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * limit, total)}
          </span>{" "}
          of <span className="font-medium">{total}</span> results
        </p>
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        >
          <button
            aria-label="Previous Page"
            data-testid="previous-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              aria-label={`Page ${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                currentPage === index + 1
                  ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            aria-label="Next Page"
            data-testid="next-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <FaAngleRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
