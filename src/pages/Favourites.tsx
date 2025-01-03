import { useDispatch, useSelector } from "react-redux"
import { FaTrashAlt } from "react-icons/fa"
import { removeFromFavorites } from "../store/favoritesSlice"
import { RootState } from "../store/store"
import { useNavigate } from "react-router"
import { EmptyState, ProductCard } from "../components"
import { FiHeart } from "react-icons/fi"
import { motion } from "framer-motion"
import { ProductCardProps } from "../types"

const Favorites = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const favorites =
    useSelector((state: RootState) => state?.favorites.items)
  const handleDeleteFavorite = (productId: number) => {
    dispatch(removeFromFavorites(productId))
  }

  const handleShopNow = () => {
    navigate("/products")
  }

  const hasFavorites = favorites?.length > 0

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">
        {hasFavorites
          ? "Your Favorite Products"
          : "You have no favorite products"}
      </h2>

      {hasFavorites ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {favorites.map((product: ProductCardProps) => (
            <motion.div
              key={product.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                thumbnail={product.thumbnail}
                rating={product.rating}
              />
              <motion.button
                data-testid="delete-favorite"
                onClick={() => handleDeleteFavorite(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrashAlt />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          message="You haven’t added any favourites yet."
          buttonText="Shop Now"
          onButtonClick={handleShopNow}
          icon={<FiHeart />}
        />
      )}
    </div>
  )
}

export default Favorites
