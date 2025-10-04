import { useQuery } from '@tanstack/react-query'

export const usersKeys = {
  all: ['users'],
  list: (filters) => ['users', 'list', filters],
}

export function useUsers(filters = { page: 1 }) {
  const baseUrl = import.meta.env.VITE_API_URL || '/api'
  const { page = 1 } = filters || {}
  return useQuery({
    queryKey: usersKeys.list({ page }),
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/users?page=${page}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || res.statusText)
      }
      return res.json()
    },
    select: (data) => ({
      users: data.items || data.data || [],
      total: data.total || 0,
    }),
    refetchOnMount: false,
  })
}
