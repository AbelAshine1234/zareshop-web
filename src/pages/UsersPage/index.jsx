import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const qc = useQueryClient()
  const baseUrl = import.meta.env.VITE_API_URL || '/api'

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['users', 'list', { page }],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/users?page=${page}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || res.statusText)
      }
      return res.json()
    },
    select: (data) => ({ users: data.items || data.data || [], total: data.total || 0 }),
  })

  const { mutate, isPending, isError: isMutError, error: mutError } = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || res.statusText)
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const [name, setName] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    mutate({ name })
    setName('')
  }

  if (isLoading) return <div className="container">Loading users...</div>
  if (isError) return <div className="container">Error: {error.message}</div>

  return (
    <div className="container" style={{ padding: 16 }}>
      <h1>Users</h1>

      <div style={{ margin: '12px 0' }}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <ul>
        {(data?.users || []).map((u) => (
          <li key={u.id}>{u.name || u.email || `User #${u.id}`}</li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
      <hr style={{ margin: '16px 0' }} />
      <h2>Create user</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <button type="submit" disabled={isPending}>{isPending ? 'Creating…' : 'Create User'}</button>
      </form>
      {isMutError && <div style={{ color: 'red' }}>{mutError.message}</div>}
    </div>
  )
}
