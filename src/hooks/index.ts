import axios from "axios"
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query"
import { Category, Product, UseProductsParams, ProductResponse } from "../types"

const API_BASE_URL = "https://dummyjson.com/products"

export const useCategories = (): UseQueryResult<Category[]> => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/categories`)
      return response.data
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}

export const useProducts = ({
  limit,
  skip,
  searchQuery,
  category,
  sortBy,
  order,
}: UseProductsParams): UseQueryResult<ProductResponse> => {
  return useQuery({
    queryKey: ["products", limit, skip, searchQuery, category, sortBy, order],
    queryFn: async () => {
      let url = `${API_BASE_URL}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`

      if (searchQuery) {
        url = `${API_BASE_URL}/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
      } else if (category && category !== "All") {
        url = `${API_BASE_URL}/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
      }

      const response = await axios.get(url)
      return response.data
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export const useSingleProduct = (id: string): UseQueryResult<Product> => {
  return useQuery({
    queryKey: ["singleProducts", id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/${id}`)
      return response.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useSearchSuggestions = (query: string): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ["searchSuggestions", query],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/search?q=${query}`)
      return response.data.products.map((product: Product) => ({
        ...product,
        category: product.category || "Uncategorized",
      }))
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  })
}
