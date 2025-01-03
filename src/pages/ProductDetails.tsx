import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addToCart } from "../store/cartSlice"
import { addToFavorites } from "../store/favoritesSlice"
import { addRecentlyViewed } from "../store/recentlyViewedSlice"
import { RootState } from "../store/store"
import { Favorite, Product, AddToCartProduct } from "../types"
import { toast } from "react-toastify"
import { useSingleProduct } from "../hooks"
import Loader from "../components/Loader"
import { renderStars } from "../utils/renderStars"
import { motion } from "framer-motion"
import { ProductCard } from "../components"

const pincodeSchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
})

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [mainImage, setMainImage] = useState<string>("")
  const [isPincodeValid, setIsPincodeValid] = useState<boolean>(false)
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const recentlyViewed = useSelector((state: RootState) => state.recentlyViewed.items)

  const { isLoading, data: product } = useSingleProduct(id)

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setMainImage(product.thumbnail)
    }
  }, [product])

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product))
    }
  }, [product, dispatch])

  const handleImageClick = (image: string) => {
    setMainImage(image)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ pincode: string }>({
    resolver: zodResolver(pincodeSchema),
  })

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setValue("pincode", value)
    if (value.length === 6) {
      setIsPincodeValid(/^\d{6}$/.test(value))
    } else {
      setIsPincodeValid(false)
    }
  }

  const addToCartHandler = async (product: Product) => {
    const { id, title, price, thumbnail, brand, quantity, category } = product
    const addToCartProduct: AddToCartProduct = {
      id,
      title,
      price,
      thumbnail,
      brand: brand ?? "Locally produced",
      quantity,
      category,
      images: [],
      description: "",
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      warrantyInformation: "",
      availabilityStatus: "",
      reviews: [],
    }
    await dispatch(addToCart(addToCartProduct))
    toast.success("Product added to cart", {
      position: "bottom-right",
      autoClose: 800,
    })
  }

  const addToFavoritesHandler = async (product: Product) => {
    const { id, title, price, thumbnail, description, rating } = product
    const isFavorite = favorites?.some(
      (item: Favorite) => item?.id === product.id
    )
    if (isFavorite) {
      toast.info("Product already in favorites", {
        position: "bottom-right",
        autoClose: 800,
      })
    } else {
      await dispatch(
        addToFavorites({ id, title, price, thumbnail, description, rating })
      )
      toast.success("Product added to favorites", {
        position: "bottom-right",
        autoClose: 800,
      })
    }
  }

  const filteredRecentlyViewed = recentlyViewed.filter(item => item.id !== product?.id)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="bg-white-50 min-h-screen py-10">
      <div className="container mx-auto bg-white p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Images Section */}
          <motion.div
            className="flex flex-col items-center md:items-start space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full md:w-96 h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product?.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${product.title} thumbnail ${index}`}
                  className={`w-16 h-16 object-cover cursor-pointer rounded-lg shadow-md ${
                    mainImage === image
                      ? "ring-2 ring-blue-500"
                      : "ring-1 ring-gray-300"
                  }`}
                  onClick={() => handleImageClick(image)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Basic Info */}
            <h1 className="text-4xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg">{product.description}</p>

            {/* Price and Discount */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-blue-600">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹
                {(
                  product.price +
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
              </span>
              <span className="text-sm text-green-500 font-medium">
                ({product.discountPercentage}% OFF)
              </span>
            </div>

            {/* Pincode Input */}
            <form onSubmit={handleSubmit(() => {})} noValidate>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
                <div className="relative z-0">
                  <input
                    id="pincode"
                    type="text"
                    {...register("pincode")}
                    placeholder=" "
                    autoComplete="off"
                    aria-invalid={errors.pincode ? "true" : "false"}
                    aria-describedby="pincode-error"
                    className={`peer block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none ${
                      errors.pincode ? "border-red-500" : ""
                    }`}
                    onChange={handlePincodeChange}
                    maxLength={6}
                  />
                  <label
                    htmlFor="pincode"
                    className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      errors.pincode ? "text-red-500" : ""
                    }`}
                    style={{ zIndex: 1 }}
                  >
                    Pincode
                  </label>
                  {errors.pincode && (
                    <p id="pincode-error" className="text-red-500 text-sm">
                      {errors.pincode?.message}
                    </p>
                  )}
                </div>
                {isPincodeValid && (
                  <div className="text-green-600">
                    <div className="flex items-center space-x-2">
                      <span>{product.shippingInformation}</span>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Brand:</span>
                <span>{product.brand || "Locally produced"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Availability:</span>
                <span
                  className={
                    product.availabilityStatus === "Out of Stock"
                      ? "text-red-500 font-semibold"
                      : "text-green-500 font-semibold"
                  }
                >
                  {product.availabilityStatus}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Warranty:</span>
                <span>
                  {product.warrantyInformation || "No warranty available"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Returns:</span>
                <span>
                  {product.returnPolicy || "30-day return policy available"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6">
              <button
                className={`bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md flex items-center justify-center space-x-2 ${
                  product.availabilityStatus === "Out of Stock"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => addToCartHandler(product)}
                disabled={product.availabilityStatus === "Out of Stock"}
              >
                <span>Add to Cart</span>
              </button>
              <button
                className="bg-red-500 text-white py-3 px-8 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-red-600"
                onClick={() => addToFavoritesHandler(product)}
              >
                <span>Add to Favorites</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Recently Viewed Products */}
        {filteredRecentlyViewed.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Recently Viewed Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredRecentlyViewed.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div className="flex space-x-6 overflow-x-auto">
            {product.reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md w-80 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </span>
                  <span className="text-sm text-gray-500">
                    - {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
                <div className="mt-2 flex items-center space-x-1">
                  <span className="font-medium text-gray-700">Rating:</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span>Email: {review.reviewerEmail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetails
