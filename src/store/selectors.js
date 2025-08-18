import { createSelector } from '@reduxjs/toolkit'
import { MOCK_RECOMMENDATIONS } from '../data'

// Client Products Selectors
export const selectClientProducts = (state) => state.clientProducts
export const selectClientProductsItems = createSelector(
  [selectClientProducts],
  (clientProducts) => clientProducts.items
)
export const selectClientProductsLoading = createSelector(
  [selectClientProducts],
  (clientProducts) => clientProducts.loading
)
export const selectClientProductsError = createSelector(
  [selectClientProducts],
  (clientProducts) => clientProducts.error
)
export const selectClientProductsPagination = createSelector(
  [selectClientProducts],
  (clientProducts) => clientProducts.pagination
)

// Current Product Selectors
export const selectCurrentProduct = createSelector(
  [selectClientProducts],
  (clientProducts) => clientProducts.current
)
export const selectCurrentProductLoading = createSelector(
  [selectClientProducts],
  (clientProducts) => clientProducts.currentLoading
)

// Recommendations Selector - memoized slice of products with fallback
export const selectRecommendations = createSelector(
  [selectClientProductsItems, selectClientProductsLoading, selectClientProductsError],
  (items, loading, error) => ({
    items: loading ? [] : (error || items.length === 0) ? MOCK_RECOMMENDATIONS : items.slice(0, 8),
    loading,
    error
  })
)

// Categories Selectors
export const selectCategories = (state) => state.categories
export const selectCategoriesItems = createSelector(
  [selectCategories],
  (categories) => categories.items
)
export const selectCategoriesLoading = createSelector(
  [selectCategories],
  (categories) => categories.loading
)

// Auth Selectors
export const selectAuth = (state) => state.auth
export const selectAuthUser = createSelector(
  [selectAuth],
  (auth) => auth.user
)
export const selectAuthLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
)
export const selectIsAuthenticated = createSelector(
  [selectAuthUser],
  (user) => !!user
)

// Cart Selectors
export const selectCart = (state) => state.cart
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items
)
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
)
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
)
