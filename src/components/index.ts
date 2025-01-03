import { lazy } from "react"

const AddressForm = lazy(() => import("./AddressForm"))
const Breadcrumbs = lazy(() => import("./Breadcrumb"))
const Caraousel = lazy(() => import("./Carousel"))
const CartItem = lazy(() => import("./CartItem"))
const CartSummary = lazy(() => import("./CartSummary"))
const CategoryCard = lazy(() => import("./CategoryCard"))
const CategoryFilter = lazy(() => import("./CategoryFilter"))
const EmptyState = lazy(() => import("./EmptyState"))
const Footer = lazy(() => import("./Footer"))
const Header = lazy(() => import("./Header"))
const Hero = lazy(() => import("./Hero"))
const MobileMenu = lazy(() => import("./MobileMenu"))
const NotFound = lazy(() => import("./NotFound"))
const Pagination = lazy(() => import("./Pagination"))
const ProductCard = lazy(() => import("./ProductCard"))
const SearchBar = lazy(() => import("./SearchBar"))
const SortBy = lazy(() => import("./SortBy"))
const StepInput = lazy(() => import("./StepInput"))

export {
  AddressForm,
  Breadcrumbs,
  Caraousel,
  CartItem,
  CartSummary,
  CategoryCard,
  CategoryFilter,
  EmptyState,
  Footer,
  Header,
  Hero,
  MobileMenu,
  NotFound,
  Pagination,
  ProductCard,
  SearchBar,
  SortBy,
  StepInput,
}
