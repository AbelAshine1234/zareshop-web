// Constants barrel exports
export * from './mockData'

// App constants
export const APP_NAME = 'ZareShop'
export const DEFAULT_PAGE_SIZE = 20
export const API_TIMEOUT = 10000

// Ethiopian phone validation
export const ETHIOPIA_PHONE_REGEX = /^9[0-9]{8}$/
export const ETHIOPIA_COUNTRY_CODE = '+251'

// Image constants
export const DEFAULT_PLACEHOLDER = 'https://via.placeholder.com/200x150?text=Loading'
export const FALLBACK_IMAGE = 'https://via.placeholder.com/200x150?text=No+Image'

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  RENDER_TIME_WARNING: 16, // ms
  BUNDLE_SIZE_WARNING: 1000, // kb
  IMAGE_LAZY_LOAD_MARGIN: '50px'
}
