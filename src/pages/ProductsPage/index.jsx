import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const baseUrl = import.meta.env.VITE_API_URL || '/api'
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['products', 'list', { page }],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/products?page=${page}`)
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

  if (isLoading) return <div className="container">Loading products...</div>
  if (isError) return <div className="container">Error: {error.message}</div>

  const products = data?.products || []

  return (
    <div className="container" style={{ padding: 16 }}>
      <h1>Products</h1>

      <div style={{ margin: '12px 0' }}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12,
      }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{p.name || p.title || `#${p.id}`}</div>
            {'price' in p && <div style={{ color: '#065f46' }}>ETB {p.price}</div>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((pg) => Math.max(1, pg - 1))} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page}</span>
        <button onClick={() => setPage((pg) => pg + 1)}>Next</button>
      </div>
    </div>
  )
}
