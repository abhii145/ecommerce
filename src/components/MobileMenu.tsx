import React from "react"
import { Link } from "react-router"

interface MobileMenuProps {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setMenuOpen }) => {
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav
      className="md:hidden bg-white shadow-md p-4 space-y-4"
      aria-label="Mobile Menu"
    >
      <Link
        to="/products"
        onClick={handleLinkClick}
        className="block hover:text-blue-500 transition-colors"
      >
        Products
      </Link>
      <Link
        to="/favourites"
        onClick={handleLinkClick}
        className="block hover:text-blue-500 transition-colors"
      >
        Favourites
      </Link>
      <Link
        to="/orders"
        onClick={handleLinkClick}
        className="block hover:text-blue-500 transition-colors"
      >
        Orders
      </Link>
      <Link
        to="/cart"
        onClick={handleLinkClick}
        className="block hover:text-blue-500 transition-colors"
      >
        Cart
      </Link>
    </nav>
  )
}

export default React.memo(MobileMenu)
