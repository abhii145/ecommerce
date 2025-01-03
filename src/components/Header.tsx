import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiBox } from "react-icons/fi"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { MobileMenu, SearchBar } from "."

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartItemCount = cartItems?.length || 0

  const location = useLocation()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get("search")
    setSearchQuery(search || "")
  }, [location])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" role="banner">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600" data-testid="logo">
          <Link to="/" aria-label="ShopEasy Home">
            ShopEasy
          </Link>
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <FiX aria-label="Close menu" />
          ) : (
            <FiMenu aria-label="Open menu" />
          )}
        </button>

        <nav
          className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700"
          data-testid="nav-links"
          aria-label="Main navigation"
        >
          <Link
            to="/products"
            className="hover:text-blue-500 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/favourites"
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
          >
            <FiHeart />
            <span>Favourites</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
          >
            <FiBox />
            <span>Orders</span>
          </Link>

          <div className="relative">
            <Link
              to="/cart"
              data-testid="cart-link"
              aria-label={`Cart with ${cartItemCount} items`}
            >
              <FiShoppingCart className="hover:text-blue-500 transition-colors" />
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white text-xs absolute top-[-15px] right-[-15px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <MobileMenu setMenuOpen={setMenuOpen} data-testid="mobile-menu" />
      )}
    </header>
  )
}

export default Header
