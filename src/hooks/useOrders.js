import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, fetchOrder, updateOrderStatus, selectOrders } from '../features/orders/ordersSlice'

export function useOrders({ autoFetch = false, params } = {}) {
  const dispatch = useDispatch()
  const state = useSelector(selectOrders)

  useEffect(() => {
    if (autoFetch && state.status === 'idle') {
      dispatch(fetchOrders(params))
    }
  }, [autoFetch, params, dispatch, state.status])

  return {
    ...state,
    list: (p) => dispatch(fetchOrders(p)),
    get: (id) => dispatch(fetchOrder(id)),
    setStatus: (orderId, body) => dispatch(updateOrderStatus({ orderId, body })),
  }
}
