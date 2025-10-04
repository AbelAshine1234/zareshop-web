import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProducts} from '../features/products/productsSlice'

export default function useProducts(autoLoad = true) {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((s) => s.products)

  useEffect(() => {
    if (autoLoad && (!products || products.length === 0)) {
      dispatch(fetchProducts())
    }
  }, [autoLoad, products?.length, dispatch])

  const refresh = useCallback(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return {
    products,
    loading,
    error,
    refresh,
  }
}
