export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  warrantyInformation: string
  availabilityStatus: string
  reviews: Review[]
  quantity: number
  shippingInformation: string
  returnPolicy: string
}

export interface Review {
  reviewer: string
  date: string
  comment: string
  rating: number
  reviewerEmail: string
  reviewerName: string
}

export interface Favorite {
  id: number
  title: string
  price: number
  thumbnail: string
  description?: string
  rating?: number
}

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  brand: string
  quantity: number
  category: string
  images: string[]
  description: string
  discountPercentage: number
  rating: number
  stock: number
  warrantyInformation: string
  availabilityStatus: string
  reviews: Review[]
}

export interface CartActionsProps {
  onClear: () => void
}

export interface CartSummaryProps {
  total: string
  tax?: string
  onProceedToAddress: (discount: number, promoCode: string) => void
}

export interface CartProduct {
  id: number
  title: string
  brand: string
  price: number
  quantity: number
  thumbnail: string
}

export interface CartItemProps {
  item: CartProduct
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
}

export interface ProductCardProps {
  id: number
  title: string
  description?: string
  price: number
  thumbnail: string
  category?: string
  rating?: number
}

export interface PaginationProps {
  currentPage: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export interface SortByProps {
  sortOption: string
  order: string
  onSortChange: (sortOption: string) => void
}

export interface UseProductsParams {
  limit: number
  skip: number
  searchQuery?: string
  category?: string
  sortBy?: string
  order?: string
}

export interface Category {
  slug: string
  name: string
}

export interface SearchBarProps {
  searchQuery: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ProductResponse {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  products: Product[]
  total: number
}

export interface AddToCartProduct {
  id: number
  title: string
  price: number
  thumbnail: string
  brand: string
  quantity: number
  category: string
  images: string[]
  description: string
  discountPercentage: number
  rating: number
  stock: number
  warrantyInformation: string
  availabilityStatus: string
  reviews: Review[]
}

export interface Customer {
  name: string
  address: string
  pincode: number
  mobile: number
  email: string
}

export interface OrderItem {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
  brand: string
  category: string
  images: string[]
  description: string
  discountPercentage: number
  rating: number
  stock: number
  warrantyInformation: string
  availabilityStatus: string
  reviews: Review[]
}

export interface Order {
  id: string
  items: OrderItem[]
  total: string
  date: string
  deliveryCharge?: number
  customer: Customer
  promoCode?: string
  discount?: number
}
