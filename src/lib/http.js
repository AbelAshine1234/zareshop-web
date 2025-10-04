const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const cors = require('cors');



async function http(path, { method = 'GET', data, headers, ...rest } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include',
    ...rest,
  }
  if (data) opts.body = JSON.stringify(data)

  const res = await fetch(`${BASE_URL}${path}`, opts)
  const contentType = res.headers.get('content-type') || ''
  const parse = async () => (contentType.includes('application/json') ? res.json() : res.text())

  if (!res.ok) {
    const errBody = await parse().catch(() => ({}))
    const err = new Error((errBody && errBody.error) || res.statusText)
    err.status = res.status
    err.body = errBody
    throw err
  }
  return parse()
}
http.use(cors());

export const httpGet = (path, options) => http(path, { ...options, method: 'GET' })
export const httpPost = (path, data, options) => http(path, { ...options, method: 'POST', data })
export const httpDelete = (path, options) => http(path, { ...options, method: 'DELETE' })
export const httpPut = (path, data, options) => http(path, { ...options, method: 'PUT', data })
export default http
