import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(err)
  }
)

// ── Products ──────────────────────────────────────────────
export const getProducts = (params?: Record<string, unknown>) =>
  api.get('/products', { params })

export const getProductBySlug = (slug: string) =>
  api.get(`/products/${slug}`)

// ── Categories ────────────────────────────────────────────
export const getCategories = () => api.get('/categories')

// ── Bundles ───────────────────────────────────────────────
export const getBundles = () => api.get('/bundles')

// ── Orders ────────────────────────────────────────────────
export const createOrder = (data: unknown) => api.post('/orders', data)

export const initiatePayment = (orderId: string) =>
  api.post('/payments/initiate', { orderId })

export const getOrders = () => api.get('/orders')

// ── Auth ──────────────────────────────────────────────────
export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data)

export const register = (data: {
  name: string
  email: string
  password: string
}) => api.post('/auth/register', data)

export const getMe = () => api.get('/auth/me')

// ── Admin ─────────────────────────────────────────────────
export const adminGetProducts = (params?: Record<string, unknown>) =>
  api.get('/admin/products', { params })

export const adminCreateProduct = (data: unknown) =>
  api.post('/admin/products', data)

export const adminUpdateProduct = (id: string, data: unknown) =>
  api.put(`/admin/products/${id}`, data)

export const adminDeleteProduct = (id: string) =>
  api.delete(`/admin/products/${id}`)

export const adminGetCategories = () => api.get('/admin/categories')

export const adminCreateCategory = (data: unknown) =>
  api.post('/admin/categories', data)

export const adminUpdateCategory = (id: string, data: unknown) =>
  api.put(`/admin/categories/${id}`, data)

export const adminDeleteCategory = (id: string) =>
  api.delete(`/admin/categories/${id}`)

export const adminGetOrders = (params?: Record<string, unknown>) =>
  api.get('/admin/orders', { params })

export const adminUpdateOrderStatus = (id: string, status: string) =>
  api.patch(`/admin/orders/${id}`, { status })

export const adminGetBundles = () => api.get('/admin/bundles')

export const adminCreateBundle = (data: unknown) =>
  api.post('/admin/bundles', data)

export const adminUpdateBundle = (id: string, data: unknown) =>
  api.put(`/admin/bundles/${id}`, data)

export const adminDeleteBundle = (id: string) =>
  api.delete(`/admin/bundles/${id}`)

export const adminGetStats = () => api.get('/admin/stats')

export default api
