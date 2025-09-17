import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints } from '../../api/api'

// Format Ethiopian phone number by prepending +251
const formatEthiopian = (phoneLocal) => {
  // Remove any existing +251 or 251 prefix if present
  const cleanPhone = phoneLocal.replace(/^(\+251|251)/, '')
  return `+251${cleanPhone}`
}

const initialState = {
  step: 1,
  totalSteps: 7, // Owner, Basics, Categories, Payment, Documents, Review, Subscription
  owner: {
    name: '',
    phoneLocal: '', // local number without country code, e.g. 9XXXXXXXX
    password: '',
    code: '', // Changed from otp to code
    registering: false,
    registered: false,
    verifying: false,
    resending: false,
    verified: false,
    error: '',
    info: '',
  },
  type: 'individual', // 'individual' | 'business'
  name: '',
  description: '',
  category_ids: [],
  payment_method: { name: '', account_number: '', account_holder: '', type: 'telebirr', details: '' },
  images: { cover_image: null, fayda_image: null, business_license_image: null },
  subscription_id: '',
  // owner_user_id removed - using bearer token instead
}

export const registerOwner = createAsyncThunk('vendor/registerOwner', async (_, { getState, rejectWithValue }) => {
  try {
    const { vendor: { owner } } = getState()
    const { name, password } = owner
    const phone_number = formatEthiopian(owner.phoneLocal)
    await api.post(endpoints.registerOwner, { name, phone_number, password })
    return { info: 'OTP sent to your phone.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to register owner') }
})

export const verifyOtp = createAsyncThunk('vendor/verifyOtp', async (_, { getState, rejectWithValue, dispatch }) => {
  try {
    const { vendor: { owner } } = getState()
    const { code, password } = owner
    const phone_number = formatEthiopian(owner.phoneLocal)
    await api.post(endpoints.verifyOtp, { phone_number, code })
    // silent login
    const data = await api.post(endpoints.login, { phone_number, password })
    const token = data?.token || data?.access_token || data?.jwt
    if (token) localStorage.setItem('authToken', token)
    return { info: 'Phone verified.' }
  } catch (e) { return rejectWithValue(e.message || 'OTP verification failed') }
})

export const resendOtp = createAsyncThunk('vendor/resendOtp', async (_, { getState, rejectWithValue }) => {
  try {
    const { vendor: { owner } } = getState()
    const phone_number = formatEthiopian(owner.phoneLocal)
    await api.post(endpoints.resendOtp, { phone_number })
    return { info: 'Verification code resent.' }
  } catch (e) { return rejectWithValue(e.message || 'Failed to resend verification code') }
})

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    nextStep(state) { if (state.step < state.totalSteps) state.step += 1 },
    prevStep(state) { if (state.step > 1) state.step -= 1 },
    gotoStep(state, action) { const n = action.payload; if (n >= 1 && n <= state.totalSteps) state.step = n },

    setOwnerField(state, action) {
      Object.assign(state.owner, action.payload)
    },
    setBasics(state, action) {
      const { type, name, description } = action.payload
      if (type) state.type = type
      if (name !== undefined) state.name = name
      if (description !== undefined) state.description = description
    },
    setCategories(state, action) { state.category_ids = action.payload || [] },
    setPaymentMethod(state, action) { state.payment_method = { ...state.payment_method, ...action.payload } },
    setImages(state, action) { state.images = { ...state.images, ...action.payload } },
    setSubscription(state, action) { state.subscription_id = action.payload },
    // setOwnerUserId removed - using bearer token instead
    resetVendor(state) { Object.assign(state, initialState) },
  },
  extraReducers: builder => {
    builder
      .addCase(registerOwner.pending, (state) => {
        state.owner.registering = true; state.owner.error = ''; state.owner.info = ''
      })
      .addCase(registerOwner.fulfilled, (state, action) => {
        state.owner.registering = false; state.owner.registered = true; state.owner.info = action.payload.info
      })
      .addCase(registerOwner.rejected, (state, action) => {
        state.owner.registering = false; state.owner.error = action.payload || 'Failed to register owner'
      })

      .addCase(verifyOtp.pending, (state) => {
        state.owner.verifying = true; state.owner.error = ''; state.owner.info = ''
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.owner.verifying = false; state.owner.verified = true; state.owner.info = action.payload.info
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.owner.verifying = false; state.owner.error = action.payload || 'OTP verification failed'
      })

      .addCase(resendOtp.pending, (state) => {
        state.owner.resending = true; state.owner.error = ''; state.owner.info = ''
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.owner.resending = false; state.owner.info = action.payload.info
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.owner.resending = false; state.owner.error = action.payload || 'Failed to resend OTP'
      })
  }
})

export const {
  nextStep,
  prevStep,
  gotoStep,
  setOwnerField,
  setBasics,
  setCategories,
  setPaymentMethod,
  setImages,
  setSubscription,
  // setOwnerUserId removed - using bearer token instead
  resetVendor,
} = vendorSlice.actions

export default vendorSlice.reducer
