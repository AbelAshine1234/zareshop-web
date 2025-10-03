import { api } from './api'

// Auth endpoints
export const authApi = {
  // Login returns token
  login: (body) => api.post('/auth/login', body),

  // Current authenticated user
  me: () => api.get('/auth/me', { auth: true }),

  // OTP-based vendor owner registration
  registerVendorOwner: (formData) => api.post('/auth/register-vendor-owner', formData),
  verifyOtp: (body) => api.post('/auth/verify-otp', body),
  resendOtp: (body) => api.post('/auth/resend-otp', body),

  // Client registration (multipart in backend but our helper auto-handles FormData)
  registerClient: (formData) => api.post('/auth/register-client', formData),

  // Forgot/reset password flow
  forgotPassword: (body) => api.post('/auth/forgot-password', body),
  verifyResetOtp: (body) => api.post('/auth/verify-reset-otp', body),
  resetPassword: (body) => api.post('/auth/reset-password', body),
}
