import { useLocation, useNavigate } from "react-router"
import { useCategories, useProducts } from "../hooks"
import { FaShoppingBag } from "react-icons/fa"
import Loader from "../components/Loader"
import {
  CategoryFilter,
  EmptyState,
  Pagination,
  ProductCard,
  SortBy,
} from "../components"
import { motion } from "framer-motion"

const Products = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)

  const searchQuery = params.get("q") || ""
  const selectedCategory = params.get("category") || "All"
  const sortBy = params.get("sortBy") || "price"
  const order = params.get("order") || "asc"
  const limit = 10
  const skip = Number(params.get("skip")) || 0

  const { data: categories } = useCategories()
  const { data, isLoading } = useProducts({
    limit,
    skip,
    searchQuery,
    category: selectedCategory,
    sortBy,
    order,
  })

  const handleCategoryChange = (category: string) => {
    params.set("category", category)
    params.set("skip", "0")
    navigate(`?${params.toString()}`)
  }

  const handleSortChange = (sortOption: string) => {
    const [sortByValue, orderValue] = sortOption.split("-")
    params.set("sortBy", sortByValue)
    params.set("order", orderValue)
    navigate(`?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    params.set("skip", ((page - 1) * limit).toString())
    navigate(`?${params.toString()}`)
  }

  const hasProducts = data?.products.length > 0

  const handleShopNow = () => {
    navigate("/products")
  }

  return (
    <div className="container mx-auto my-8 flex flex-col min-h-screen">
      {isLoading ? (
        <Loader data-testid="loader" />
      ) : (
        <>
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {hasProducts ? "Product List" : "No Product Found"}
          </motion.h2>
          <div className="flex-grow flex flex-col">
            {hasProducts ? (
              <>
                <motion.div
                  className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CategoryFilter
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                  <SortBy
                    sortOption={sortBy}
                    order={order}
                    onSortChange={handleSortChange}
                  />
                </motion.div>

                <motion.div
                  className="flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {data?.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        category={product.category}
                        rating={product.rating}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Pagination
                    currentPage={skip / limit + 1}
                    total={data?.total || 0}
                    limit={limit}
                    onPageChange={handlePageChange}
                  />
                </motion.div>
              </>
            ) : (
              <EmptyState
                message="No products found"
                buttonText="Shop Now"
                onButtonClick={handleShopNow}
                icon={<FaShoppingBag />}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
