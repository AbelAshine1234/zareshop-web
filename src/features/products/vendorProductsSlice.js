import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

// Fetch products for the authenticated vendor owner
export const fetchMyProducts = createAsyncThunk('vendorProducts/fetchMyProducts', async (params = {}, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const token = state.auth?.token
    const query = new URLSearchParams(params).toString()
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const data = await api.get(`/products/my-products${query ? `?${query}` : ''}`, { headers })
    // Expecting { products, pagination }
    return data
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load products')
  }
})

// Create a new product (multipart/form-data with images/videos/specs)
export const createProduct = createAsyncThunk('vendorProducts/createProduct', async (formValues, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const token = state.auth?.token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const fd = new FormData()
    // Basic fields per Joi schema
    fd.append('name', formValues.name)
    if (formValues.description) fd.append('description', formValues.description)
    fd.append('has_discount', String(!!formValues.has_discount))
    fd.append('sold_in_bulk', String(!!formValues.sold_in_bulk))
    fd.append('used', String(!!formValues.used))
    fd.append('stock', String(formValues.stock))
    fd.append('category_id', String(formValues.category_id))
    fd.append('subcategory_id', String(formValues.subcategory_id))

    // Specs: array of {key, value} as specs[i][key], specs[i][value]
    if (Array.isArray(formValues.specs) && formValues.specs.length > 0) {
      formValues.specs.forEach((sp, i) => {
        if (sp && (sp.key || sp.value)) {
          if (typeof sp.key !== 'undefined') fd.append(`specs[${i}][key]`, String(sp.key))
          if (typeof sp.value !== 'undefined') fd.append(`specs[${i}][value]`, String(sp.value))
        }
      })
    }

    // Files
    if (formValues.images && formValues.images.length) {
      Array.from(formValues.images).forEach((file) => fd.append('images', file))
    }
    if (formValues.videos && formValues.videos.length) {
      Array.from(formValues.videos).forEach((file) => fd.append('videos', file))
    }

    const data = await api.post('/products', fd, { headers })
    return data
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to create product')
  }
})

// Fetch a single product by ID (for vendor owner)
export const fetchProductById = createAsyncThunk('vendorProducts/fetchProductById', async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const token = state.auth?.token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const data = await api.get(`/products/${id}`, { headers })
    return data
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load product')
  }
})

// Update product by ID (multipart) — can edit fields and optionally append new images/videos
export const updateProduct = createAsyncThunk('vendorProducts/updateProduct', async ({ id, values }, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const token = state.auth?.token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const fd = new FormData()
    if (typeof values.name !== 'undefined') fd.append('name', values.name)
    if (typeof values.description !== 'undefined' && values.description) fd.append('description', values.description)
    if (typeof values.has_discount !== 'undefined') fd.append('has_discount', String(!!values.has_discount))
    if (typeof values.sold_in_bulk !== 'undefined') fd.append('sold_in_bulk', String(!!values.sold_in_bulk))
    if (typeof values.used !== 'undefined') fd.append('used', String(!!values.used))
    if (typeof values.stock !== 'undefined') fd.append('stock', String(values.stock))
    if (typeof values.category_id !== 'undefined') fd.append('category_id', String(values.category_id))
    if (typeof values.subcategory_id !== 'undefined') fd.append('subcategory_id', String(values.subcategory_id))

    if (Array.isArray(values.specs)) {
      values.specs.forEach((sp, i) => {
        if (sp && (sp.key || sp.value)) {
          if (typeof sp.key !== 'undefined') fd.append(`specs[${i}][key]`, String(sp.key))
          if (typeof sp.value !== 'undefined') fd.append(`specs[${i}][value]`, String(sp.value))
        }
      })
    }

    if (values.images && values.images.length) {
      Array.from(values.images).forEach((file) => fd.append('images', file))
    }
    if (values.videos && values.videos.length) {
      Array.from(values.videos).forEach((file) => fd.append('videos', file))
    }

    const data = await api.post(`/products/${id}?_method=PUT`, fd, { headers })
    // Using POST with _method override for fetch API convenience; backend supports PUT with multer
    return data
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to update product')
  }
})

// Delete product by ID
export const deleteProduct = createAsyncThunk('vendorProducts/deleteProduct', async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const token = state.auth?.token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    // Simple fetch override since api helper lacks delete; reuse post with method override
    const data = await api.post(`/products/${id}?_method=DELETE`, {}, { headers })
    return { id, data }
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to delete product')
  }
})

const initialState = {
  items: [],
  pagination: { page: 1, limit: 10, total: 0, pages: 0 },
  loading: false,
  error: '',
  creating: false,
  createError: '',
  lastCreated: null,
  current: null,
  currentLoading: false,
  currentError: '',
  updating: false,
  updateError: '',
  deleting: false,
  deleteError: '',
}

const vendorProductsSlice = createSlice({
  name: 'vendorProducts',
  initialState,
  reducers: {
    clearCreateState(state) { state.creating = false; state.createError = ''; state.lastCreated = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProducts.pending, (state) => { state.loading = true; state.error = '' })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.products || []
        state.pagination = action.payload.pagination || initialState.pagination
      })
      .addCase(fetchMyProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(createProduct.pending, (state) => { state.creating = true; state.createError=''; state.lastCreated=null })
      .addCase(createProduct.fulfilled, (state, action) => { state.creating = false; state.lastCreated = action.payload?.product || null })
      .addCase(createProduct.rejected, (state, action) => { state.creating = false; state.createError = action.payload })

      // fetch single product
      .addCase(fetchProductById.pending, (state) => { state.currentLoading = true; state.currentError = ''; state.current = null })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.currentLoading = false; state.current = action.payload?.product || action.payload || null })
      .addCase(fetchProductById.rejected, (state, action) => { state.currentLoading = false; state.currentError = action.payload })

      // update product
      .addCase(updateProduct.pending, (state) => { state.updating = true; state.updateError = '' })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = false
        const updated = action.payload?.product || null
        state.current = updated || state.current
        // also update list if present
        if (updated && state.items && state.items.length) {
          const idx = state.items.findIndex(p => p.id === updated.id)
          if (idx >= 0) state.items[idx] = updated
        }
      })
      .addCase(updateProduct.rejected, (state, action) => { state.updating = false; state.updateError = action.payload })

      // delete product
      .addCase(deleteProduct.pending, (state) => { state.deleting = true; state.deleteError = '' })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting = false
        const id = action.payload?.id
        if (id) state.items = state.items.filter(p => p.id !== id)
        state.current = null
      })
      .addCase(deleteProduct.rejected, (state, action) => { state.deleting = false; state.deleteError = action.payload })
  }
})

export const { clearCreateState } = vendorProductsSlice.actions
export default vendorProductsSlice.reducer
