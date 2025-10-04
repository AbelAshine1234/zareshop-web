import { api, productEndpoints } from './api'

// List products (optionally pass a params object to build a query string)
export const listProducts = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return api.get(productEndpoints.getProducts)
  }
  const qs = new URLSearchParams(params).toString()
  return api.get(`${productEndpoints.getProducts}?${qs}`)
}

// Get a single product by ID
export const getProductById = (productId) => api.get(productEndpoints.getProductById(productId))

export const productApi = {
  list: listProducts,
  getById: getProductById,
}

export default productApi