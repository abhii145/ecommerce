import { BrowserRouter as Router, Routes, Route } from "react-router"
import { Suspense } from "react"
import { Breadcrumbs, Footer, Header, NotFound } from "./components"
import {
  Cart,
  Favorites,
  Home,
  Orders,
  ProductDetails,
  Products,
} from "./pages"
import Loader from "./components/Loader"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Suspense fallback={<Loader />}>
          <Header />
          <main className="container mx-auto p-4 flex-grow">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/favourites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </Router>
    </div>
  )
}

export default App
