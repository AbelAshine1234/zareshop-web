import { useQuery } from '@tanstack/react-query'

export const productsKeys = {
  all: ['products'],
  list: (filters) => ['products', 'list', filters],
}

export function useProducts(filters = { page: 1, categoryId: undefined }) {
  const baseUrl = import.meta.env.VITE_API_URL || '/api'
  const { page = 1, categoryId } = filters || {}
  return useQuery({
    queryKey: productsKeys.list({ page, categoryId }),
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set('page', String(page))
      if (categoryId) params.set('categoryId', String(categoryId))
      const res = await fetch(`${baseUrl}/products?${params.toString()}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || res.statusText)
      }
      return res.json()
    },
    select: (data) => ({
      products: data.items || data.data || [],
      total: data.total || 0,
    }),
    keepPreviousData: true,
  })
}
