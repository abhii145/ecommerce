import React from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export const renderStars = (rating: number) => {
  const validRating = Math.min(Math.max(rating, 0), 5)
  const fullStars = Math.floor(validRating)
  const halfStar = validRating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  return (
    <div className="flex">
      {[...Array(fullStars)]?.map((_, i) => (
        <AiFillStar key={`full-${i}`} className="text-yellow-500" />
      ))}
      {halfStar === 1 && (
        <AiFillStar key="half" className="text-yellow-500 opacity-50" />
      )}
      {[...Array(emptyStars)]?.map((_, i) => (
        <AiOutlineStar
          key={`empty-${i}`}
          className="text-yellow-500 opacity-50"
        />
      ))}
    </div>
  )
}
