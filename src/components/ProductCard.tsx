import React, { memo } from "react"
import { FiInfo } from "react-icons/fi"
import { ProductCardProps } from "../types"
import { Link } from "react-router"
import { renderStars } from "../utils/renderStars"

const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  description,
  rating = 0,
}: ProductCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="h-full object-contain"
          loading="lazy"
          width="100%"
          height="100%"
          data-testid="product-image"
        />
      </div>
      <div className="p-4 flex flex-col h-full">
        <h2
          className="text-xl font-semibold mb-2 truncate"
          data-testid="product-title"
        >
          {title}
        </h2>
        <p
          className="text-gray-600 mb-2 line-clamp-3 min-h-[4rem]"
          data-testid="product-description"
          aria-label={`Description: ${description}`}
        >
          {`${description?.slice(0, 50)}...`}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold" data-testid="product-price">
            ₹ {price.toFixed(2)}
          </span>
          <div
            className="flex items-center"
            data-testid="product-rating"
            aria-label={`Rating: ${rating} stars`}
          >
            {renderStars(rating)}
          </div>
        </div>

        <Link
          to={`/products/${id}`}
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
          aria-label={`More details about ${title}`}
          data-testid="more-details-link"
        >
          <FiInfo className="mr-2" />
          More Details
        </Link>
      </div>
    </article>
  )
}

export default memo(ProductCard)
