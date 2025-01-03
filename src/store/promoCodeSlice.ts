import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { CartItem, Order } from "../types"

interface PromoCodeState {
  promoCode: string
  discount: number
  promoMessage: string
}

const initialState: PromoCodeState = {
  promoCode: "",
  discount: 0,
  promoMessage: "",
}

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    setPromoCode(state, action: PayloadAction<string>) {
      state.promoCode = action.payload
    },
    setDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload
    },
    setPromoMessage(state, action: PayloadAction<string>) {
      state.promoMessage = action.payload
    },
    clearPromoCode(state) {
      state.promoCode = ""
      state.discount = 0
      state.promoMessage = ""
    },
    clearPromoMessage(state) {
      state.promoMessage = ""
    },
    applyPromoCode(
      state,
      action: PayloadAction<{ cartItems: CartItem[]; orders: Order[] }>
    ) {
      const { cartItems, orders } = action.payload
      const vehicleCategories = ["motorcycle", "vehicle"]

      const cartTotal =
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
        1.18
      const vehicleTotal =
        cartItems
          .filter((item) => vehicleCategories.includes(item.category))
          .reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.18
      const groceriesTotal =
        cartItems
          .filter((item) => item.category === "groceries")
          .reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.18

      if (orders.length > 0 && state.promoCode === "NEW25") {
        state.discount = 0
        state.promoMessage = "This promo code is for first-time orders only."
      } else if (state.promoCode === "NEW25" && cartTotal >= 500) {
        state.discount = 25
        state.promoMessage = "₹25 off applied on your first order!"
      } else if (state.promoCode === "VEHICLE500" && vehicleTotal >= 5000) {
        state.discount = 500
        state.promoMessage = "₹500 off on vehicle items successfully applied."
      } else if (state.promoCode === "GROCERY100" && groceriesTotal >= 1000) {
        state.discount = 100
        state.promoMessage = "₹100 off on groceries applied."
      } else {
        state.discount = 0
        state.promoMessage =
          "Invalid promo code or conditions not met. Please try again."
      }
    },
  },
})

export const {
  setPromoCode,
  setDiscount,
  setPromoMessage,
  clearPromoCode,
  applyPromoCode,
  clearPromoMessage,
} = promoCodeSlice.actions

export const selectPromoCode = (state: RootState) => state.promoCode

export default promoCodeSlice.reducer
