import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../store/cartSlice'

const baseStore = configureStore({ reducer: { cart: cartReducer } })
type RootState = ReturnType<typeof baseStore.getState>

export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: preloadedState as RootState,
  })
}

export type TestStore = ReturnType<typeof createTestStore>