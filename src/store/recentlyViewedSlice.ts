import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../types"

interface RecentlyViewedState {
  items: Product[]
}

const initialState: RecentlyViewedState = {
  items: [],
}

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1)
      }
      state.items.unshift(action.payload)
      if (state.items.length > 4) {
        state.items.pop()
      }
    },
  },
})

export const { addRecentlyViewed } = recentlyViewedSlice.actions
export default recentlyViewedSlice.reducer
