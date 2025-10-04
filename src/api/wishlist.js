import { api, wishlistEndpoints } from './api'

// Get current user's wishlist (auth required)
export const listWishlist = () => api.get(wishlistEndpoints.getWishlist, { auth: true })

// Add a product to wishlist (auth required)
export const addToWishlist = (productId) =>
  api.post(wishlistEndpoints.add, { product_id: productId }, { auth: true })

// Remove a product from wishlist (auth required)
export const removeFromWishlist = (productId) =>
  api.delete(wishlistEndpoints.removeByProduct(productId), { auth: true })

export const wishlistApi = {
  list: listWishlist,
  add: addToWishlist,
  remove: removeFromWishlist,
}

export default wishlistApi
