import { lazy } from "react"

const Cart = lazy(() => import("./Cart"))
const Favorites = lazy(() => import("./Favourites"))
const Home = lazy(() => import("./Home"))
const Orders = lazy(() => import("./Order"))
const ProductDetails = lazy(() => import("./ProductDetails"))
const Products = lazy(() => import("./Products"))

export { Cart, Favorites, Home, Orders, ProductDetails, Products }
