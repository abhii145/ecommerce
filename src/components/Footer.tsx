import { memo } from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6 mt-auto" role="contentinfo">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
      <nav className="space-x-4 mt-4 md:mt-0" aria-label="Footer navigation">
        <a href="/" className="hover:underline" aria-label="Home">
          Home
        </a>
        <a href="/products" className="hover:underline" aria-label="Products">
          Products
        </a>
        <a href="/favourites" className="hover:underline" aria-label="Favourites">
          Favourites
        </a>
        <a href="/cart" className="hover:underline" aria-label="Cart">
          Cart
        </a>
      </nav>
    </div>
  </footer>
);

export default memo(Footer);
