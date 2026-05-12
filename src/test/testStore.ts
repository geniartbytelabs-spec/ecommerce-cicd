import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../store/cartSlice'

type CartItem = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: { rate: number; count: number }
  quantity: number
}

type PreloadedCartState = {
  cart?: {
    items: CartItem[]
  }
}

export function createTestStore(preloadedState: PreloadedCartState = {}) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  })
}