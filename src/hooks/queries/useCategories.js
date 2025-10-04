import { useQuery } from '@tanstack/react-query'

export const categoriesKeys = {
  all: ['categories'],
  list: () => ['categories', 'list'],
}

export default function useCategories() {
  const baseUrl = import.meta.env.VITE_API_URL || '/api'
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/category`, { credentials: 'omit' })
      const contentType = res.headers.get('content-type') || ''
      if (!res.ok) {
        const body = contentType.includes('application/json')
          ? await res.json().catch(() => ({}))
          : await res.text().catch(() => '')
        const message = typeof body === 'string' ? res.statusText : (body?.error || res.statusText)
        throw new Error(message)
      }
      if (!contentType.includes('application/json')) {
        throw new Error('Expected JSON but received non-JSON response. Check VITE_API_URL and that /category returns JSON.')
      }
      return res.json()
    },
    select: (data) => data.items || data.data || data || [],
    staleTime: 60_000,
  })
}
