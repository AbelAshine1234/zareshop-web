import { api } from './api'

const BASE = '/orders'

export const getAllOrders = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  const path = qs ? `${BASE}?${qs}` : BASE
  return api.get(path)
}

export const getOrderById = (orderId) => api.get(`${BASE}/${orderId}`)

export const getOrdersByVendor = (vendorId, params = {}) => {
  const qs = new URLSearchParams(params).toString()
  const path = qs ? `${BASE}/vendor/${vendorId}?${qs}` : `${BASE}/vendor/${vendorId}`
  return api.get(path)
}

export const patchOrderStatus = (orderId, body) => api.patch(`${BASE}/${orderId}/status`, body)

// The backend defines PATCH /:order_id/status; our api helper has .put/.post available.
// Prefer PUT if available; otherwise fallback to POST to be explicit about a body.
