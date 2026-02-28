export interface Product {
  id: string
  name: string
  slug: string
  description: string
  basePrice: number
  image: string
  stock: number
  isAvailable: boolean
  category: Category
  variants: ProductVariant[]
  rating?: number
  reviewCount?: number
  badge?: 'bestseller' | 'new' | 'promo'
  originalPrice?: number
}

export interface ProductVariant {
  id: string
  name: string
  additionalPrice: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  count?: number
}

export interface Bundle {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number
  image: string
  items: BundleItem[]
  isPopular?: boolean
}

export interface BundleItem {
  product: Product
  qty: number
}

export interface Order {
  id: string
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY' | 'ON_DELIVERY' | 'COMPLETED' | 'CANCELLED'
  type: 'DELIVERY' | 'PICKUP'
  totalPrice: number
  address?: string
  pickupTime?: string
  paymentStatus: string
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  product: Product
  variant?: ProductVariant
  qty: number
  price: number
  notes?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'CUSTOMER' | 'ADMIN'
}

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  variantId?: string
  variantName?: string
  qty: number
  notes?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductFilters {
  cat?: string
  sort?: 'popular' | 'newest' | 'price_asc' | 'price_desc'
  min?: number
  max?: number
  available?: boolean
  diet?: string[]
  search?: string
  page?: number
}

export interface CheckoutForm {
  name: string
  phone: string
  type: 'DELIVERY' | 'PICKUP'
  address?: string
  notes?: string
  pickupTime?: string
}
