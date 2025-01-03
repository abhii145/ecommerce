import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Order } from "../types"

interface OrdersState {
  orders: Order[]
}

const initialState: OrdersState = {
  orders: [],
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
    },
  },
})

export const { addOrder } = orderSlice.actions
export default orderSlice.reducer
