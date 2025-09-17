import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'
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
    const res = await api.post('/auth/login', body)
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
    await api.post('/auth/forgot-password', { phone_number: formatEthiopianPhone(phoneLocal) })
    return { info: 'OTP has been sent to your phone.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to send OTP') }
})

export const verifyResetOtp = createAsyncThunk('auth/verifyResetOtp', async ({ phoneLocal, code }, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/verify-reset-otp', { phone_number: formatEthiopianPhone(phoneLocal), code })
    const token = res?.reset_token
    if (!token) throw new Error('Missing reset token')
    return { token, info: 'OTP verified. Set your new password.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to verify OTP') }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, new_password }, { rejectWithValue }) => {
  try {
    await api.post('/auth/reset-password', { token, new_password })
    return { info: 'Password reset successfully.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to reset password') }
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
  }
})

export const { logout, clearAuthMessages, setForgotStep, setForgotPhone, setForgotOtp, clearForgot } = authSlice.actions
export default authSlice.reducer
