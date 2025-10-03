import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth'
import { formatEthiopianPhone, validateEthiopianPhone } from '../../utils/phoneUtils'

const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: '',
  info: '',
  // forgot/reset state
  fp: {
    step: 1, // 1 phone, 2 otp, 3 reset
    phoneLocal: '',
    otp: '',
    resetToken: '',
    loading: false,
    error: '',
    info: '',
  }
}

// Load current authenticated user ("me")
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_arg, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const token = state.auth?.token
    if (!token) return rejectWithValue('Not authenticated')
    const me = await authApi.me()
    return me
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load user')
  }
})

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    // payload may contain { identifier, password, isPhone }
    const { identifier, password, isPhone } = payload
    let body = { password }
    if (isPhone) {
      if (!validateEthiopianPhone(identifier)) throw new Error('Invalid phone number')
      body.phone_number = formatEthiopianPhone(identifier)
    } else {
      body.email = identifier.trim()
    }
    const res = await authApi.login(body)
    const token = res?.token || res?.access_token || res?.jwt
    if (token) localStorage.setItem('authToken', token)
    return { token }
  } catch (e) {
    return rejectWithValue(e.message || 'Login failed')
  }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (phoneLocal, { rejectWithValue }) => {
  try {
    if (!validateEthiopianPhone(phoneLocal)) throw new Error('Enter valid 9-digit phone starting with 9')
    await authApi.forgotPassword({ phone_number: formatEthiopianPhone(phoneLocal) })
    return { info: 'OTP has been sent to your phone.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to send OTP') }
})

export const verifyResetOtp = createAsyncThunk('auth/verifyResetOtp', async ({ phoneLocal, code }, { rejectWithValue }) => {
  try {
    const res = await authApi.verifyResetOtp({ phone_number: formatEthiopianPhone(phoneLocal), code })
    const token = res?.reset_token
    if (!token) throw new Error('Missing reset token')
    return { token, info: 'OTP verified. Set your new password.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to verify OTP') }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, new_password }, { rejectWithValue }) => {
  try {
    await authApi.resetPassword({ token, new_password })
    return { info: 'Password reset successfully.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to reset password') }
})

// Vendor owner onboarding (optional OTP flow)
export const registerVendorOwner = createAsyncThunk('auth/registerVendorOwner', async (formData, { rejectWithValue }) => {
  try {
    // formData should be FormData including fields per backend requirements
    const res = await authApi.registerVendorOwner(formData)
    return res
  } catch (e) { return rejectWithValue(e.message || 'Vendor owner registration failed') }
})

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (body, { rejectWithValue }) => {
  try { return await authApi.verifyOtp(body) } catch (e) { return rejectWithValue(e.message || 'OTP verification failed') }
})

export const resendOtp = createAsyncThunk('auth/resendOtp', async (body, { rejectWithValue }) => {
  try { return await authApi.resendOtp(body) } catch (e) { return rejectWithValue(e.message || 'Resend OTP failed') }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('authToken')
    },
    clearAuthMessages(state) { state.error = ''; state.info = '' },
    setForgotStep(state, action) { state.fp.step = action.payload },
    setForgotPhone(state, action) { state.fp.phoneLocal = action.payload },
    setForgotOtp(state, action) { state.fp.otp = action.payload },
    clearForgot(state) { state.fp = { ...initialState.fp } },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => { state.loading = true; state.error = ''; state.info = '' })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.token = action.payload.token; state.info = 'Logged in' })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      // fetchMe
      .addCase(fetchMe.pending, (state) => { state.loading = true; state.error = ''; state.info = '' })
      .addCase(fetchMe.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(fetchMe.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      // forgot
      .addCase(forgotPassword.pending, (state) => { state.fp.loading = true; state.fp.error = ''; state.fp.info = '' })
      .addCase(forgotPassword.fulfilled, (state, action) => { state.fp.loading = false; state.fp.info = action.payload.info; state.fp.step = 2 })
      .addCase(forgotPassword.rejected, (state, action) => { state.fp.loading = false; state.fp.error = action.payload })
      // verify otp
      .addCase(verifyResetOtp.pending, (state) => { state.fp.loading = true; state.fp.error=''; state.fp.info='' })
      .addCase(verifyResetOtp.fulfilled, (state, action) => { state.fp.loading = false; state.fp.resetToken = action.payload.token; state.fp.info = action.payload.info; state.fp.step = 3 })
      .addCase(verifyResetOtp.rejected, (state, action) => { state.fp.loading = false; state.fp.error = action.payload })
      // reset password
      .addCase(resetPassword.pending, (state) => { state.fp.loading = true; state.fp.error=''; state.fp.info='' })
      .addCase(resetPassword.fulfilled, (state, action) => { state.fp.loading = false; state.fp.info = action.payload.info })
      .addCase(resetPassword.rejected, (state, action) => { state.fp.loading = false; state.fp.error = action.payload })
      // Vendor owner registration/OTP informational messages
      .addCase(registerVendorOwner.pending, (state) => { state.loading = true; state.error = ''; state.info = '' })
      .addCase(registerVendorOwner.fulfilled, (state) => { state.loading = false; state.info = 'Registration initiated. Verify OTP.' })
      .addCase(registerVendorOwner.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(verifyOtp.pending, (state) => { state.loading = true; state.error = ''; state.info = '' })
      .addCase(verifyOtp.fulfilled, (state) => { state.loading = false; state.info = 'OTP verified.' })
      .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(resendOtp.pending, (state) => { state.loading = true; state.error = ''; state.info = '' })
      .addCase(resendOtp.fulfilled, (state) => { state.loading = false; state.info = 'OTP resent.' })
      .addCase(resendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export const { logout, clearAuthMessages, setForgotStep, setForgotPhone, setForgotOtp, clearForgot } = authSlice.actions

// Selector to check if current user has an approved vendor
export const selectIsVendorApproved = (state) => {
  const me = state.auth?.user
  if (!me) return false
  const v = me?.vendor || me?.user?.vendor || {}
  return Boolean((me?.vendorStatus === 'approved') || (v?.isApproved === true && v?.status === true) || (v?.is_approved === true && v?.status === true))
}

export default authSlice.reducer
