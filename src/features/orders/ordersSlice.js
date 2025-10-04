import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllOrders, getOrderById, patchOrderStatus } from '../../api/orders'

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getAllOrders(params)
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load orders')
    }
  }
)

export const fetchOrder = createAsyncThunk(
  'orders/fetchOne',
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await getOrderById(orderId)
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load order')
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, body }, { rejectWithValue }) => {
    try {
      const data = await patchOrderStatus(orderId, body)
      return { orderId, data }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update order status')
    }
  }
)

const initialState = {
  items: [],
  current: null,
  status: 'idle',
  error: null,
  updateStatus: 'idle',
  updateError: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Assuming API returns { orders: [...] } or an array
        const payload = action.payload
        state.items = payload?.orders || payload?.data || payload || []
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error?.message
      })
      // fetchOrder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Assuming API returns { order: {...} } or the order object
        const payload = action.payload
        state.current = payload?.order || payload?.data || payload || null
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error?.message
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateStatus = 'loading'
        state.updateError = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded'
        const updated = action.payload?.data || action.payload
        // try to merge into current and list
        if (state.current && updated) {
          state.current = { ...state.current, ...updated }
        }
        if (updated?.id) {
          state.items = state.items.map((o) => (o.id === updated.id ? { ...o, ...updated } : o))
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateStatus = 'failed'
        state.updateError = action.payload || action.error?.message
      })
  },
})

export const { clearCurrent } = ordersSlice.actions

export const selectOrders = (state) => state.orders

export default ordersSlice.reducer
