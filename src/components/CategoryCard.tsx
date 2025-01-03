import React from "react"
import { Link } from "react-router"
import { slugToSvg } from "../utils/categoryImages"

interface CategoryCardProps {
  title: string
  slug: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, slug }) => {
  const SvgImage = slugToSvg[slug]

  return (
    <>
      <Link
        to={`/products?category=${encodeURIComponent(slug)}`}
        className="block"
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={SvgImage}
            alt={title}
            className="w-full h-48 object-contain"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-xl font-bold">{title}</h2>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CategoryCard
