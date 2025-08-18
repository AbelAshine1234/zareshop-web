// Type definitions and validation helpers

/**
 * Product type structure
 * @typedef {Object} Product
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} currency - Price currency
 * @property {Array} images - Product images
 * @property {Object} category - Product category
 * @property {string} description - Product description
 */

/**
 * Category type structure
 * @typedef {Object} Category
 * @property {string} id - Category ID
 * @property {string} title - Category title
 * @property {string} img - Category image URL
 * @property {Array} subcategories - Child categories
 */

/**
 * User type structure
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} phone - User phone number
 * @property {string} role - User role (customer, vendor, admin)
 */

/**
 * API Response type structure
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Request success status
 * @property {any} data - Response data
 * @property {string} message - Response message
 * @property {Object} pagination - Pagination info
 */

// Validation helpers
export const isValidProduct = (product) => {
  return product && 
         typeof product.id === 'string' &&
         typeof product.name === 'string' &&
         typeof product.price === 'number'
}

export const isValidUser = (user) => {
  return user &&
         typeof user.id === 'string' &&
         typeof user.email === 'string' &&
         user.email.includes('@')
}

export const isValidEthiopianPhone = (phone) => {
  return /^9[0-9]{8}$/.test(phone)
}
