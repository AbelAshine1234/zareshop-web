import { configureStore } from '@reduxjs/toolkit'
import vendorReducer from '../features/vendor/vendorSlice'
import categoriesReducer from '../features/categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['vendor/setImages'],
        ignoredPaths: [
          'vendor.images.cover_image',
          'vendor.images.fayda_image',
          'vendor.images.business_license_image',
        ],
      },
    }),
})

export default store
