import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload
      const existing = state.items.find((item) => item.id === plant.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...plant, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload
      state.items = state.items.filter((item) => item.id !== id)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((plant) => plant.id === id)
      if (!item) return
      if (quantity <= 0) {
        state.items = state.items.filter((plant) => plant.id !== id)
      } else {
        item.quantity = quantity
      }
    }
  }
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer