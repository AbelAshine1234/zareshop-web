import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  message: 'Loading...'
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading(state, action) {
      state.isOpen = true
      state.message = action.payload?.message || 'Loading...'
    },
    hideLoading(state) {
      state.isOpen = false
      state.message = 'Loading...'
    }
  }
})

export const { showLoading, hideLoading } = loadingSlice.actions
export default loadingSlice.reducer
