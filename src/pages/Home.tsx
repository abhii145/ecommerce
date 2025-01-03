import { useCategories } from "../hooks"
import Loader from "../components/Loader"
import { CategoryCard, Hero } from "../components"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { FaArrowRight } from "react-icons/fa"

const Home = () => {
  const { data: categories, isLoading } = useCategories()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto my-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold">Shop by Category</h4>
          <Link
            to="/products"
            className="text-blue-700 hover:underline flex items-center"
          >
            View All <FaArrowRight className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories?.slice(0, 3).map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard title={category.name} slug={category.slug} />
            </motion.div>
          ))}
        </div>
        {/* <Promocode /> */}
      </div>
    </>
  )
}

export default Home
