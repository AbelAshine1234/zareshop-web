import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export const fetchProducts = createAsyncThunk('clientProducts/fetchProducts', async (params = {}, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams(params).toString()
    const data = await api.get(`/products${query ? `?${query}` : ''}`)
    return data
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load products')
  }
})

const initialState = {
  items: [],
  pagination: { page: 1, limit: 20, total: 0, pages: 0 },
  loading: false,
  error: '',
  current: null,
  currentLoading: false,
  currentError: '',
}

export const fetchProductById = createAsyncThunk('clientProducts/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const data = await api.get(`/products/${id}`)
    return data
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load product')
  }
})

const clientProductsSlice = createSlice({
  name: 'clientProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = '' })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.products || action.payload || []
        state.pagination = action.payload.pagination || initialState.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(fetchProductById.pending, (state) => { state.currentLoading = true; state.currentError = ''; state.current = null })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.currentLoading = false; state.current = action.payload?.product || action.payload || null })
      .addCase(fetchProductById.rejected, (state, action) => { state.currentLoading = false; state.currentError = action.payload })
  }
})

export default clientProductsSlice.reducer
