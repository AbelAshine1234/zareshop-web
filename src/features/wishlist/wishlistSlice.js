import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { wishlistApi } from '../../api/wishlist'

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const data = await wishlistApi.list()
    return data?.items || data || []
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load wishlist')
  }
})

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId, { rejectWithValue }) => {
  try {
    const data = await wishlistApi.add(productId)
    return { productId, item: data?.item || data }
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to add to wishlist')
  }
})

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (productId, { rejectWithValue }) => {
  try {
    await wishlistApi.remove(productId)
    return { productId }
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to remove from wishlist')
  }
})

const initialState = {
  items: [], // array of product ids or product objects
  loading: false,
  error: '',
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; state.error = '' })
      .addCase(fetchWishlist.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || [] })
      .addCase(fetchWishlist.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(addToWishlist.pending, (state) => { state.error = '' })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const id = action.payload?.productId
        if (!id) return
        const exists = state.items.some((i) => (i.product_id || i.id || i._id || i) === id)
        if (!exists) {
          const item = action.payload.item
          // If API returns a wishlist item object, prefer it; otherwise store product id
          state.items.push(item && (item.product_id || item.id || item._id) ? item : id)
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => { state.error = action.payload })

      .addCase(removeFromWishlist.pending, (state) => { state.error = '' })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const id = action.payload?.productId
        state.items = state.items.filter((i) => (i.product_id || i.id || i._id || i) !== id)
      })
      .addCase(removeFromWishlist.rejected, (state, action) => { state.error = action.payload })
  }
})

export default wishlistSlice.reducer
