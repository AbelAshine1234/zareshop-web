import { httpGet } from '../lib/http'

export function fetchProducts({ page = 1, categoryId } = {}) {
  const params = new URLSearchParams()
  params.set('page', String(page))
  if (categoryId) params.set('categoryId', String(categoryId))
  return httpGet(`/products?${params.toString()}`)
}
