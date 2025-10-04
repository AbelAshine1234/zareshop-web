import { api, categoryEndpoints } from './api'

// List all top-level categories
export const listCategories = () => api.get(categoryEndpoints.getCategories)

// Get category detail by ID (if backend supports it)
export const getCategoryById = (categoryId) => api.get(`/category/${categoryId}`)

// Get subcategories for a category
export const getSubcategories = (categoryId) => api.get(categoryEndpoints.getSubcategories(categoryId))

// Get categories associated with a vendor (adjust path if backend differs)
export const getCategoryByVendor = (vendorId) => api.get(`/vendors/${vendorId}/categories`)

export const categoriesApi = {
  list: listCategories,
  getById: getCategoryById,
  getSubcategories,
  getByVendor: getCategoryByVendor,
}

export default categoriesApi

