import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Favorite } from "../types"

interface FavoritesState {
  items: Favorite[]
}

const initialState: FavoritesState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Favorite>) => {
      const product = action.payload
      const existingProduct = state.items?.find(
        (item) => item.id === product.id
      )
      if (!existingProduct) {
        state.items?.push(product)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.id !== productId)
    },
    clearFavorites: (state) => {
      state.items = []
    },
  },
})

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions
export default favoritesSlice.reducer
