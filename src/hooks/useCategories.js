import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchSubcategories } from '../features/categories/categoriesSlice'

export default function useCategories(autoLoad = true) {
  const dispatch = useDispatch()
  const { categories, loading, error, subcategories, subcategoriesLoading, subcategoriesError } = useSelector(
    (s) => s.categories
  )

  useEffect(() => {
    if (autoLoad && (!categories || categories.length === 0)) {
      dispatch(fetchCategories())
    }
  }, [autoLoad, categories?.length, dispatch])

  const refresh = useCallback(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const loadSubcategories = useCallback(
    (categoryId) => {
      if (!categoryId) return
      dispatch(fetchSubcategories(categoryId))
    },
    [dispatch]
  )

  return {
    categories,
    loading,
    error,
    subcategories,
    subcategoriesLoading,
    subcategoriesError,
    refresh,
    loadSubcategories,
  }
}

