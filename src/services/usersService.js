import { httpGet, httpPost } from '../lib/http'

export function fetchUsers({ page = 1 } = {}) {
  return httpGet(`/users?page=${page}`)
}

export function createUser(payload) {
  return httpPost('/users', payload)
}
