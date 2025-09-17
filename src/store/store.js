import { configureStore } from '@reduxjs/toolkit'
import vendorReducer from '../features/vendor/vendorSlice'

export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
  },
})

export default store
