import { configureStore } from '@reduxjs/toolkit'
import vendorReducer from '../features/vendor/vendorSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import authReducer from '../features/auth/authSlice'
import vendorProductsReducer from '../features/products/vendorProductsSlice'
import clientProductsReducer from '../features/products/clientProductsSlice'
import loadingReducer from '../features/ui/loadingSlice'
import cartReducer from '../features/cart/cartSlice'
import ordersReducer from '../features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    categories: categoriesReducer,
    auth: authReducer,
    vendorProducts: vendorProductsReducer,
    loading: loadingReducer,
    cart: cartReducer,
    clientProducts: clientProductsReducer,
    orders: ordersReducer,
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
