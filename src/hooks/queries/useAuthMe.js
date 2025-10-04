import { useQuery } from '@tanstack/react-query'

export function useAuthMe() {
  const baseUrl = import.meta.env.VITE_API_URL || '/api'
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/auth/me`, { credentials: 'include' })
      if (!res.ok) throw new Error('Unauthenticated')
      const ct = res.headers.get('content-type') || ''
      return ct.includes('application/json') ? res.json() : null
    },
    retry: false,
    staleTime: 60_000,
  })
}
export default useAuthMe
