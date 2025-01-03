import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddToCartProduct } from "../types"

interface CartState {
  items: AddToCartProduct[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartProduct>) => {
      const product = action.payload
      const existingProduct = state.items.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1
      } else {
        state.items.push({ ...product, quantity: product.quantity || 1 })
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const product = state.items.find((item) => item.id === productId)
      if (product) {
        product.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const product = state.items.find((item) => item.id === productId)
      if (product && product.quantity > 1) {
        product.quantity -= 1
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.id !== productId)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer
