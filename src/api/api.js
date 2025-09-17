// Centralized API helper
// Reads base URL from Vite env: VITE_BASE_URL

export const BASE_URL = import.meta.env.VITE_BASE_URL || ''

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data
}

export const api = {
  get: (path, options = {}) => request(path, { method: 'GET', ...options }),
  post: (path, body, options = {}) => request(path, { method: 'POST', body, ...options }),
}

// Auth endpoints used by Vendor Owner onboarding
export const endpoints = {
  registerOwner: '/auth/register-vendor-owner',
  verifyOtp: '/auth/verify-otp',
  resendOtp: '/auth/resend-otp',
  login: '/auth/login',
}
