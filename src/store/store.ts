import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import cartReducer from "./cartSlice"
import favoritesReducer from "./favoritesSlice"
import ordersReducer from "./ordersSlice"
import promoCodeReducer from "./promoCodeSlice"
import recentlyViewedReducer from "./recentlyViewedSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  orders: ordersReducer,
  promoCode: promoCodeReducer,
  recentlyViewed: recentlyViewedReducer,
})

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
