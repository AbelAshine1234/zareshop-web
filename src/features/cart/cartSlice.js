import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { id, name, price, qty, image }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, price = 0, qty = 1, image } = action.payload || {}
      if (!id) return
      const existing = state.items.find((it) => it.id === id)
      if (existing) {
        existing.qty += qty
      } else {
        state.items.push({ id, name, price: Number(price) || 0, qty, image })
      }
    },
    removeItem(state, action) {
      const id = action.payload
      state.items = state.items.filter((it) => it.id !== id)
    },
    updateQty(state, action) {
      const { id, qty } = action.payload
      const it = state.items.find((i) => i.id === id)
      if (it) it.qty = Math.max(1, Number(qty) || 1)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
