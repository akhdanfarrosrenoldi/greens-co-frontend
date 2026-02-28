# Claude Code Prompt — Greens & Co. Frontend (Next.js)

Paste prompt ini ke Claude Code di folder project kamu.

---

## PROMPT

```
Build a complete Next.js Latest frontend for "Greens & Co." — a fresh F&B e-commerce website.

---

## TECH STACK
- Next.js Latest (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (for form components, dialogs, toasts)
- Lucide React (icons — use these exclusively, no emoji icons)
- Framer Motion (page transitions + scroll animations)
- Zustand (cart state management)
- Axios (HTTP client, base URL from env)
- next-themes (dark/light — skip for now, light only)

---

## DESIGN SYSTEM
```
Font heading : Playfair Display (Google Fonts)
Font body    : DM Sans (Google Fonts)

Colors:
  --green       : #16a34a
  --green-dark  : #15803d
  --green-light : #dcfce7
  --green-mid   : #bbf7d0
  --surface     : #f9fafb
  --surface2    : #f0fdf4
  --border      : #e5e7eb
  --text        : #111827
  --muted       : #6b7280
```

---

## FOLDER STRUCTURE
```
src/
├── app/
│   ├── layout.tsx              ← root layout, fonts, providers
│   ├── page.tsx                ← landing page
│   ├── menu/
│   │   ├── page.tsx            ← menu listing page
│   │   └── [slug]/
│   │       └── page.tsx        ← product detail page
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── orders/
│   │   └── page.tsx            ← order history (protected)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── admin/
│       ├── layout.tsx          ← admin layout (protected, role: admin)
│       ├── page.tsx            ← dashboard (stats cards)
│       ├── products/page.tsx   ← product management table + CRUD
│       ├── categories/page.tsx
│       ├── orders/page.tsx     ← order list + status update
│       └── bundles/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/               ← landing page sections
│   │   ├── Hero.tsx
│   │   ├── FeaturedMenu.tsx
│   │   ├── BundleSection.tsx
│   │   └── HowItWorks.tsx
│   ├── menu/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryTabs.tsx
│   │   └── FilterSidebar.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartDrawer.tsx      ← slide-in cart from right
│   ├── checkout/
│   │   ├── OrderForm.tsx
│   │   └── DeliveryPickupToggle.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── StatsCard.tsx
│       ├── DataTable.tsx
│       └── ProductForm.tsx
├── store/
│   └── cart.ts                 ← Zustand store
├── lib/
│   ├── api.ts                  ← Axios instance (baseURL from NEXT_PUBLIC_API_URL)
│   ├── auth.ts                 ← token helpers (localStorage)
│   └── utils.ts                ← formatRupiah, cn, etc
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useScrollReveal.ts
├── types/
│   └── index.ts                ← all TypeScript interfaces
└── middleware.ts               ← protect /orders and /admin routes
```

---

## PAGES DETAIL

### 1. Landing Page (`/`)
Sections in order:
1. **Hero** — headline "Fresh Food, Delivered to Your Door.", subtext, 2 CTA buttons (Order Now → /menu, View Menu), hero image from Unsplash, 2 floating cards (Fast Delivery, 100% Fresh), stats (500+ customers, 30+ menu, 4.9★)
2. **USP Strip** — green background, 4 items: Fast Delivery, Fresh Ingredients, Healthy, Free Pickup
3. **Featured Menu** — 4 product cards, "View All" link to /menu
4. **Bundle Section** — 3 bundle cards, most popular highlighted with green border
5. **How It Works** — 4 steps: Browse → Add to Cart → Checkout → Enjoy
6. **Footer** — 4 columns: brand + tagline, Menu links, Info links, Contact info

### 2. Menu Page (`/menu`)
- Sticky category tabs: All, Salad, Rice Bowl, Drinks, Snack
- Left sidebar: search input, sort dropdown, price range inputs, availability checkboxes, diet type checkboxes
- Product grid (3 columns): ProductCard with image, category, name, description, rating, stock status, price, add to cart button, wishlist button
- URL query params for filter state: ?cat=salad&sort=popular&min=15000&max=75000
- Pagination at bottom

### 3. Product Detail (`/menu/[slug]`)
- Large product image (left)
- Right side: category tag, name, price, description, rating & reviews count
- Variant selector (radio buttons for size/variant)
- Quantity selector (−/+)
- Notes textarea
- "Add to Cart" button → adds to Zustand cart + show toast
- Related products section at bottom (4 cards)

### 4. Cart Page (`/cart`)
- List of cart items (image, name, variant, quantity −/+, subtotal, remove)
- Order summary card (subtotal, delivery fee, total)
- "Proceed to Checkout" button
- "Continue Shopping" link
- Empty cart state with illustration

### 5. Checkout Page (`/checkout`)
- Toggle: Delivery / Pickup
- If Delivery: name, phone, full address, notes
- If Pickup: name, phone, pickup time selector
- Order summary (readonly)
- "Pay Now" button → calls POST /orders then POST /payments/initiate → redirect to Midtrans URL

### 6. Order History (`/orders`) — protected
- List of orders with: order ID, date, status badge, total, items preview
- Click order → expand or modal with full detail

### 7. Auth Pages
- Login: email + password form
- Register: name + email + password + confirm password
- On success: save JWT token to localStorage, redirect

### 8. Admin Dashboard (`/admin`)
- Protected: only role === 'admin' can access (middleware.ts)
- Sidebar: Dashboard, Products, Categories, Orders, Bundles
- Dashboard: stats cards (total orders, revenue, products, customers)
- Products page: table with search, add/edit/delete, image upload
- Orders page: table with status filter, update status dropdown per row
- Categories & Bundles: simple CRUD tables

---

## ZUSTAND CART STORE (`src/store/cart.ts`)
```typescript
interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  variantId?: string
  variantName?: string
  qty: number
  notes?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQty: (productId: string, variantId: string | undefined, qty: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}
```

---

## API INTEGRATION (`src/lib/api.ts`)
```typescript
// Base instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
})

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// API functions to create:
export const getProducts = (params?) => api.get('/products', { params })
export const getProductBySlug = (slug: string) => api.get(`/products/${slug}`)
export const getCategories = () => api.get('/categories')
export const getBundles = () => api.get('/bundles')
export const createOrder = (data) => api.post('/orders', data)
export const initiatePayment = (orderId: string) => api.post('/payments/initiate', { orderId })
export const getOrders = () => api.get('/orders')
export const login = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)
export const getMe = () => api.get('/auth/me')

// Admin APIs
export const adminGetProducts = (params?) => api.get('/admin/products', { params })
export const adminCreateProduct = (data) => api.post('/admin/products', data)
export const adminUpdateProduct = (id, data) => api.put(`/admin/products/${id}`, data)
export const adminDeleteProduct = (id) => api.delete(`/admin/products/${id}`)
export const adminGetOrders = (params?) => api.get('/admin/orders', { params })
export const adminUpdateOrderStatus = (id, status) => api.patch(`/admin/orders/${id}`, { status })
```

---

## TYPESCRIPT INTERFACES (`src/types/index.ts`)
```typescript
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
}

export interface Bundle {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  items: BundleItem[]
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
```

---

## ENV FILE (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## IMPORTANT NOTES
1. Use real Unsplash photos for placeholder images:
   - Salad: https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80
   - Rice bowl: https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80
   - Green juice: https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80
   - Oats: https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80
   - Quinoa: https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80
   - Acai bowl: https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80
   - Bundle 1: https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80
   - Bundle 2: https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80
   - Hero: https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80

2. All icons must use Lucide React — no emoji
3. Cart state persists via Zustand (in-memory only for now, no localStorage)
4. API calls use mock/static data if backend not running yet (add fallback in api.ts)
5. formatRupiah helper: `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })`
6. Add `loading` and `error` states for all API calls
7. Mobile responsive (at minimum: navbar hamburger menu, single column grid on mobile)
8. Smooth scroll reveal animations on section entry using Framer Motion

---



untuk Deasing checn greenco html dan ubah ke versi next js
