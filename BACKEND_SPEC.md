# Greens & Co. — Backend API Specification

> **Generated from:** frontend codebase analysis (`src/lib/api.ts`, `src/types/index.ts`, all page & component files)
> **Last updated:** 2026-02-28

---

## Section 1: Project Overview

| Field | Value |
|---|---|
| **Project** | Greens & Co. |
| **Description** | Healthy food ordering platform — delivery & pickup, with customer-facing storefront and admin panel |
| **Frontend** | Next.js 16.1.6 (App Router, Turbopack), TypeScript 5, Tailwind CSS 3 |
| **State Management** | Zustand (cart), React Context (auth) |
| **HTTP Client** | Axios — base URL from `NEXT_PUBLIC_API_URL` env var |
| **Base API URL** | `http://localhost:8080/api` (development) |
| **Auth Mechanism** | JWT — stored in `localStorage` (`token`, `user`); also written to cookies (`token`, `role`) for middleware route protection |

---

## Section 2: File → Backend Dependency Map

| File | Responsibility | Data Required from Backend |
|---|---|---|
| `src/lib/api.ts` | Axios instance + all API calls | All endpoints |
| `src/lib/auth.ts` | localStorage token/user helpers | — |
| `src/types/index.ts` | All TypeScript interfaces | Shape of every API response |
| `src/proxy.ts` | Edge middleware — route protection | Reads `token` + `role` cookies |
| `src/app/page.tsx` | Landing page | `GET /products`, `GET /categories`, `GET /bundles` |
| `src/app/menu/page.tsx` | Menu listing with filters + pagination | `GET /products` (with query params), `GET /categories` |
| `src/app/menu/[slug]/page.tsx` | Product detail page | `GET /products/:slug` |
| `src/app/cart/page.tsx` | Cart (Zustand, client-side only) | None |
| `src/app/checkout/page.tsx` | Checkout form → place order | `POST /orders`, `POST /payments/initiate` |
| `src/app/orders/page.tsx` | Customer order history | `GET /orders` |
| `src/app/auth/login/page.tsx` | Login form | `POST /auth/login` |
| `src/app/auth/register/page.tsx` | Register form | `POST /auth/register` |
| `src/app/admin/page.tsx` | Admin dashboard | `GET /admin/stats`, `GET /admin/orders?limit=5` |
| `src/app/admin/products/page.tsx` | Product CRUD | `GET/POST/PUT/DELETE /admin/products` |
| `src/app/admin/orders/page.tsx` | Order status management | `GET /admin/orders`, `PATCH /admin/orders/:id` |
| `src/app/admin/categories/page.tsx` | Category CRUD | `GET/POST/PUT/DELETE /admin/categories` |
| `src/app/admin/bundles/page.tsx` | Bundle CRUD | `GET/POST/PUT/DELETE /admin/bundles` |
| `src/components/admin/ProductForm.tsx` | Product create/edit form | `GET /categories`, `POST /admin/products`, `PUT /admin/products/:id` |
| `src/components/sections/Hero.tsx` | Homepage hero | Static (no API) |
| `src/components/sections/FeaturedMenu.tsx` | Homepage featured items | `GET /products` |
| `src/components/sections/BundleSection.tsx` | Homepage bundles | `GET /bundles` |

---

## Section 3: All API Endpoints

### Auth — `/auth/*`

---

```
POST  /auth/login
Description  : Authenticate a user and return a JWT token
Auth required: no
Request body : { email: string, password: string }
Response     : { token: string, user: { id: string, name: string, email: string, role: "CUSTOMER"|"ADMIN" } }
Called from  : src/app/auth/login/page.tsx, src/lib/api.ts
```

---

```
POST  /auth/register
Description  : Register a new customer account
Auth required: no
Request body : { name: string, email: string, password: string }
Response     : { token: string, user: { id: string, name: string, email: string, role: "CUSTOMER" } }
Called from  : src/app/auth/register/page.tsx, src/lib/api.ts
```

---

```
GET   /auth/me
Description  : Get the currently authenticated user's profile
Auth required: yes (Bearer JWT)
Request body : —
Response     : { data: { id: string, name: string, email: string, role: "CUSTOMER"|"ADMIN" } }
Called from  : src/lib/api.ts (useAuth hook)
```

---

### Products — `/products/*`

---

```
GET   /products
Description  : List all products with optional filtering, sorting, and pagination
Auth required: no
Query params :
  cat        (string)  — category slug, e.g. "salad"
  sort       (string)  — popular | newest | price_asc | price_desc
  min        (number)  — minimum price (IDR)
  max        (number)  — maximum price (IDR)
  available  (boolean) — filter by stock availability, default: true
  diet       (string)  — vegetarian | vegan | high-protein | low-carb [INFERRED]
  search     (string)  — search by product name
  page       (number)  — page number, default: 1
  limit      (number)  — items per page, default: 9
Response     : {
  data: Product[],
  total: number,
  page: number,
  limit: number,
  totalPages: number
}
Called from  : src/app/menu/page.tsx, src/components/sections/FeaturedMenu.tsx, src/app/page.tsx
```

---

```
GET   /products/:slug
Description  : Get a single product by its slug
Auth required: no
Path params  : slug (string) — unique product slug
Response     : { data: Product }
Called from  : src/app/menu/[slug]/page.tsx
```

---

### Categories — `/categories/*`

---

```
GET   /categories
Description  : List all product categories
Auth required: no
Response     : { data: Category[] }
Called from  : src/app/menu/page.tsx, src/components/sections/FeaturedMenu.tsx, src/components/admin/ProductForm.tsx
```

---

### Bundles — `/bundles/*`

---

```
GET   /bundles
Description  : List all meal bundles
Auth required: no
Response     : { data: Bundle[] }
Called from  : src/app/page.tsx, src/components/sections/BundleSection.tsx
```

---

### Orders — `/orders/*`

---

```
POST  /orders
Description  : Create a new order from cart items
Auth required: yes (Bearer JWT)
Request body : {
  name        : string,
  phone       : string,
  type        : "DELIVERY" | "PICKUP",
  address     : string,           (required if type=DELIVERY)
  notes       : string,           (optional)
  pickupTime  : string,           (required if type=PICKUP, e.g. "10:00")
  items: [
    {
      productId : string,
      variantId : string | null,
      qty       : number,
      price     : number,
      notes     : string | null
    }
  ]
}
Response     : { data: Order, message: "Order created" }
Called from  : src/app/checkout/page.tsx
```

---

```
GET   /orders
Description  : Get all orders for the authenticated customer
Auth required: yes (Bearer JWT)
Query params :
  page   (number) — default: 1
  limit  (number) — default: 10
Response     : {
  data: Order[],
  total: number,
  page: number,
  limit: number,
  totalPages: number
}
Called from  : src/app/orders/page.tsx
```

---

### Payments — `/payments/*`

---

```
POST  /payments/initiate
Description  : Initiate a Midtrans payment for an order; returns a redirect URL
Auth required: yes (Bearer JWT)
Request body : { orderId: string }
Response     : { data: { paymentUrl: string } }
Called from  : src/app/checkout/page.tsx
Notes        : Frontend redirects to paymentUrl via window.location.href
```

---

### Admin — `/admin/*`

> All admin endpoints require `Authorization: Bearer <JWT>` and role `ADMIN`.

---

```
GET   /admin/stats
Description  : Aggregate dashboard statistics
Auth required: yes (ADMIN)
Response     : {
  data: {
    totalOrders    : number,
    totalRevenue   : number,
    totalProducts  : number,
    totalCustomers : number
  }
}
Called from  : src/app/admin/page.tsx
```

---

```
GET   /admin/products
Description  : List all products (admin view, no availability filter)
Auth required: yes (ADMIN)
Query params :
  search  (string)  — search by name
  page    (number)  — default: 1
  limit   (number)  — default: 20
Response     : { data: Product[], total: number, page: number, limit: number, totalPages: number }
Called from  : src/app/admin/products/page.tsx
```

---

```
POST  /admin/products
Description  : Create a new product
Auth required: yes (ADMIN)
Request body : {
  name         : string,
  slug         : string,       (auto-derived from name if omitted)
  description  : string,
  basePrice    : number,
  stock        : number,
  image        : string,       (URL)
  categoryId   : string,       (Category UUID)
  isAvailable  : boolean,
  variants     : [{ name: string, additionalPrice: number }]
}
Response     : { data: Product, message: "Product created" }
Called from  : src/components/admin/ProductForm.tsx
```

---

```
PUT   /admin/products/:id
Description  : Update an existing product
Auth required: yes (ADMIN)
Path params  : id (string) — Product UUID
Request body : Same as POST /admin/products; for variants include id to update, omit id to create new
Response     : { data: Product, message: "Product updated" }
Called from  : src/components/admin/ProductForm.tsx
```

---

```
DELETE /admin/products/:id
Description  : Delete a product
Auth required: yes (ADMIN)
Path params  : id (string) — Product UUID
Response     : { message: "Product deleted" }
Called from  : src/app/admin/products/page.tsx
```

---

```
GET   /admin/categories
Description  : List all categories (admin view)
Auth required: yes (ADMIN)
Response     : { data: Category[] }
Called from  : src/app/admin/categories/page.tsx
```

---

```
POST  /admin/categories
Description  : Create a new category
Auth required: yes (ADMIN)
Request body : { name: string, slug: string, image?: string }
Response     : { data: Category, message: "Category created" }
Called from  : src/components/admin/CategoryForm.tsx [INFERRED]
```

---

```
PUT   /admin/categories/:id
Description  : Update a category
Auth required: yes (ADMIN)
Path params  : id (string) — Category UUID
Request body : { name: string, slug: string, image?: string }
Response     : { data: Category, message: "Category updated" }
Called from  : src/components/admin/CategoryForm.tsx [INFERRED]
```

---

```
DELETE /admin/categories/:id
Description  : Delete a category
Auth required: yes (ADMIN)
Path params  : id (string) — Category UUID
Response     : { message: "Category deleted" }
Called from  : src/app/admin/categories/page.tsx
```

---

```
GET   /admin/orders
Description  : List all orders (admin view) with optional status filter
Auth required: yes (ADMIN)
Query params :
  status  (string)  — filter by OrderStatus enum value
  page    (number)  — default: 1
  limit   (number)  — default: 20
Response     : { data: Order[], total: number, page: number, limit: number, totalPages: number }
Called from  : src/app/admin/orders/page.tsx, src/app/admin/page.tsx
```

---

```
PATCH /admin/orders/:id
Description  : Update an order's status
Auth required: yes (ADMIN)
Path params  : id (string) — Order UUID
Request body : { status: "PENDING"|"PAID"|"PROCESSING"|"READY"|"ON_DELIVERY"|"COMPLETED"|"CANCELLED" }
Response     : { data: Order, message: "Status updated" }
Called from  : src/app/admin/orders/page.tsx
```

---

```
GET   /admin/bundles
Description  : List all bundles (admin view)
Auth required: yes (ADMIN)
Response     : { data: Bundle[] }
Called from  : src/app/admin/bundles/page.tsx
```

---

```
POST  /admin/bundles
Description  : Create a new bundle
Auth required: yes (ADMIN)
Request body : {
  name          : string,
  slug          : string,
  description   : string,
  price         : number,
  originalPrice : number,
  image         : string,     (URL)
  isPopular     : boolean,
  items         : [{ productId: string, qty: number }]
}
Response     : { data: Bundle, message: "Bundle created" }
Called from  : src/components/admin/BundleForm.tsx [INFERRED]
```

---

```
PUT   /admin/bundles/:id
Description  : Update a bundle
Auth required: yes (ADMIN)
Path params  : id (string) — Bundle UUID
Request body : Same as POST /admin/bundles
Response     : { data: Bundle, message: "Bundle updated" }
Called from  : src/components/admin/BundleForm.tsx [INFERRED]
```

---

```
DELETE /admin/bundles/:id
Description  : Delete a bundle
Auth required: yes (ADMIN)
Path params  : id (string) — Bundle UUID
Response     : { message: "Bundle deleted" }
Called from  : src/app/admin/bundles/page.tsx
```

---

## Section 4: Data Models

### Model: Product

```
Field         : Type        : Notes
id            : string      : required, UUID
name          : string      : required
slug          : string      : required, unique, auto-generate from name
description   : string      : required
basePrice     : number      : required, IDR integer
image         : string      : required, URL
stock         : number      : required, integer ≥ 0
isAvailable   : boolean     : required
badge         : string|null : optional — "bestseller" | "new" | "promo"
originalPrice : number|null : optional, used when badge = "promo"
rating        : number|null : optional, 0.0–5.0
reviewCount   : number|null : optional
createdAt     : string      : auto, ISO 8601
updatedAt     : string      : auto, ISO 8601

Relations:
  category    : Category           (many-to-one, FK categoryId)
  variants    : ProductVariant[]   (one-to-many)
```

### Model: ProductVariant

```
Field           : Type   : Notes
id              : string : required, UUID
name            : string : required, e.g. "Regular", "Large (+Protein)"
additionalPrice : number : required, IDR integer (0 = no extra charge)

Relations:
  product       : Product   (many-to-one)
```

### Model: Category

```
Field : Type        : Notes
id    : string      : required, UUID
name  : string      : required
slug  : string      : required, unique
image : string|null : optional, URL
count : number|null : optional — number of products in category (computed)
```

### Model: Bundle

```
Field         : Type    : Notes
id            : string  : required, UUID
name          : string  : required
slug          : string  : required, unique
description   : string  : required
price         : number  : required, discounted price IDR
originalPrice : number  : required, original price IDR
image         : string  : required, URL
isPopular     : boolean : optional, default false
createdAt     : string  : auto, ISO 8601
updatedAt     : string  : auto, ISO 8601

Relations:
  items       : BundleItem[]   (one-to-many)
```

### Model: BundleItem

```
Field   : Type   : Notes
id      : string : required, UUID
qty     : number : required

Relations:
  bundle  : Bundle   (many-to-one)
  product : Product  (many-to-one, FK productId)
```

### Model: Order

```
Field         : Type   : Notes
id            : string : required, UUID (frontend displays as "GC-XXXX")
status        : string : required, OrderStatus enum
type          : string : required, "DELIVERY" | "PICKUP"
totalPrice    : number : required, IDR total including delivery fee
name          : string : customer name
phone         : string : customer phone
address       : string : null if type=PICKUP
pickupTime    : string : null if type=DELIVERY (e.g. "10:00")
notes         : string : optional
paymentStatus : string : "UNPAID" | "PAID" | "REFUNDED" [INFERRED]
createdAt     : string : auto, ISO 8601

Relations:
  items       : OrderItem[]   (one-to-many)
  user        : User          (many-to-one, from JWT)
```

### Model: OrderItem

```
Field    : Type        : Notes
id       : string      : required, UUID
qty      : number      : required
price    : number      : required, unit price at time of order (snapshot)
notes    : string|null : optional per-item notes

Relations:
  order   : Order            (many-to-one)
  product : Product          (many-to-one, snapshot name/image also stored)
  variant : ProductVariant   (many-to-one, optional)
```

### Model: User

```
Field     : Type   : Notes
id        : string : required, UUID
name      : string : required
email     : string : required, unique
password  : string : hashed, never returned in responses
role      : string : UserRole enum
createdAt : string : auto, ISO 8601
```

---

### Enums

```
Enum: OrderStatus
  PENDING | PAID | PROCESSING | READY | ON_DELIVERY | COMPLETED | CANCELLED

Enum: OrderType
  DELIVERY | PICKUP

Enum: UserRole
  CUSTOMER | ADMIN

Enum: PaymentStatus [INFERRED]
  UNPAID | PAID | REFUNDED

Enum: ProductBadge
  bestseller | new | promo
```

---

## Section 5: Authentication & Authorization

### Login Flow

```
1. User submits { email, password }
2. POST /auth/login
3. Response: { token: string, user: { id, name, email, role } }
4. Frontend: localStorage.setItem('token', token)
             localStorage.setItem('user', JSON.stringify(user))
             document.cookie = 'token=<jwt>'       (for middleware)
             document.cookie = 'role=<role>'        (for middleware)
5. Redirect: role === 'ADMIN' → /admin, else → original redirect param or /
```

### Register Flow

```
1. User submits { name, email, password }
2. POST /auth/register
3. Response: { token, user }
4. Frontend: saves token + user to localStorage (same as login)
5. Shows success screen → redirects to / after 2s
```

### Token Usage

```
Header name : Authorization
Format      : Bearer <jwt_token>
Expiry      : JWT_EXPIRES_IN (recommend 7d)
```

### localStorage Keys

| Key | Value |
|---|---|
| `token` | JWT string |
| `user` | JSON-serialized User object |

### Cookie Names (read by Edge Middleware)

| Cookie | Value | Purpose |
|---|---|---|
| `token` | JWT string | Presence check for protected routes |
| `role` | `"admin"` | Role check for `/admin/*` routes |

> **Note:** The frontend must set both cookies after login/register. This can be done client-side via `document.cookie` or by having the backend set `Set-Cookie` headers.

### Route Protection Table

| Route | Auth Required | Role Required | Handled By |
|---|---|---|---|
| `/` | no | — | — |
| `/menu` | no | — | — |
| `/menu/[slug]` | no | — | — |
| `/cart` | no | — | — |
| `/checkout` | yes | CUSTOMER / ADMIN | `src/proxy.ts` |
| `/orders` | yes | CUSTOMER / ADMIN | `src/proxy.ts` |
| `/admin` | yes | ADMIN | `src/proxy.ts` |
| `/admin/products` | yes | ADMIN | `src/proxy.ts` |
| `/admin/orders` | yes | ADMIN | `src/proxy.ts` |
| `/admin/categories` | yes | ADMIN | `src/proxy.ts` |
| `/admin/bundles` | yes | ADMIN | `src/proxy.ts` |
| `/auth/login` | no | — | — |
| `/auth/register` | no | — | — |

---

## Section 6: Cart & Order Flow

Cart is managed entirely client-side in Zustand — no API calls until checkout.

```
Step 1 — Add to Cart
  Action : User clicks "Add to Cart" on ProductDetailPage
  Store  : Zustand addToCart({ productId, name, image, price, variantId?, variantName?, qty, notes? })
  API    : None

Step 2 — View Cart
  Action : User opens CartDrawer or navigates to /cart
  Store  : Read items[] from Zustand
  API    : None

Step 3 — Checkout
  Action : User fills checkout form and submits
  API    : POST /orders
  Request body:
  {
    "name": "Akhdan",
    "phone": "+6281234567890",
    "type": "DELIVERY",
    "address": "Jl. Contoh No.1, Bandung",
    "notes": "Extra sauce please",
    "pickupTime": "",
    "items": [
      { "productId": "uuid-1", "variantId": "uuid-v1", "qty": 2, "price": 35000, "notes": null },
      { "productId": "uuid-2", "variantId": null,       "qty": 1, "price": 45000, "notes": null }
    ]
  }
  Response:
  {
    "data": {
      "id": "order-uuid",
      "status": "PENDING",
      "totalPrice": 115000,
      ...Order fields
    },
    "message": "Order created"
  }

Step 4 — Initiate Payment
  API    : POST /payments/initiate
  Request body  : { "orderId": "order-uuid" }
  Response:
  {
    "data": {
      "paymentUrl": "https://app.sandbox.midtrans.com/snap/v2/vtweb/..."
    }
  }

Step 5 — Redirect to Midtrans
  Action : window.location.href = paymentUrl
  Result : Midtrans Snap payment page

Step 6 — Cart Cleared
  Action : clearCart() called immediately after getting paymentUrl or redirect to /orders
  Store  : Zustand cart reset to []

Step 7 — Check Order Status
  API    : GET /orders
  Action : Customer views /orders page for status updates
```

---

## Section 7: Filter & Query Parameters (`GET /products`)

| URL Param | API Param | Type | Default | Description |
|---|---|---|---|---|
| `?cat=salad` | `cat` | string | — | Filter by category slug |
| `?sort=popular` | `sort` | string | `popular` | `popular` \| `newest` \| `price_asc` \| `price_desc` |
| `?min=15000` | `min` | number | 0 | Minimum price (IDR) |
| `?max=75000` | `max` | number | — | Maximum price (IDR) |
| `?available=true` | `available` | boolean | `true` | Filter by `isAvailable` |
| `?diet=vegan` | `diet` | string | — | `vegetarian` \| `vegan` \| `high-protein` \| `low-carb` |
| `?search=salad` | `search` | string | — | Partial name match |
| `?page=2` | `page` | number | 1 | Pagination page |
| `?limit=9` | `limit` | number | 9 | Items per page |

All params are passed directly via `axios.get('/products', { params })` from the URL search params — the backend must accept them as-named.

---

## Section 8: Admin Features

| Page | Endpoints Called | Operations | Editable Fields |
|---|---|---|---|
| `/admin` | `GET /admin/stats`, `GET /admin/orders?limit=5` | Read | — |
| `/admin/products` | `GET /admin/products`, `POST /admin/products`, `PUT /admin/products/:id`, `DELETE /admin/products/:id` | Full CRUD | name, slug, description, basePrice, stock, image, categoryId, isAvailable, variants[] |
| `/admin/orders` | `GET /admin/orders?status=...`, `PATCH /admin/orders/:id` | Read, Update Status | status |
| `/admin/categories` | `GET /admin/categories`, `POST /admin/categories`, `PUT /admin/categories/:id`, `DELETE /admin/categories/:id` | Full CRUD | name, slug, image |
| `/admin/bundles` | `GET /admin/bundles`, `POST /admin/bundles`, `PUT /admin/bundles/:id`, `DELETE /admin/bundles/:id` | Full CRUD | name, slug, description, price, originalPrice, image, isPopular, items[] |

### Admin Stats Response

```json
GET /admin/stats
{
  "data": {
    "totalOrders": 128,
    "totalRevenue": 8450000,
    "totalProducts": 24,
    "totalCustomers": 89
  }
}
```

---

## Section 9: Response Format Conventions

All endpoints **must** follow these consistent formats:

### Single Resource
```json
{
  "data": { "...object fields" },
  "message": "Success"
}
```

### Paginated List
```json
{
  "data": ["...array of objects"],
  "total": 24,
  "page": 1,
  "limit": 9,
  "totalPages": 3
}
```

> **Note:** Frontend reads both `res.data.data` and `res.data` fallback (e.g., `res.data.data ?? res.data`). The `data` wrapper is preferred but both work.

### Error (4xx / 5xx)
```json
{
  "message": "Error description",
  "errors": {
    "field": "Validation message"
  }
}
```

### Auth Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "CUSTOMER"
  }
}
```

### HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | OK — successful GET or PUT |
| 201 | Created — successful POST |
| 400 | Bad Request — validation error |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient role |
| 404 | Not Found |
| 500 | Internal Server Error |

> On 401, the frontend automatically removes the token from localStorage and redirects to `/auth/login`.

---

## Section 10: Environment Variables

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend `.env`
```
# Server
PORT=8080
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/greensco

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Midtrans
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
MIDTRANS_IS_PRODUCTION=false

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## Section 11: Mock Data Reference

Use this data as seed data / fallback for development.

### Products
```json
[
  { "id": "1", "name": "Garden Fresh Salad", "slug": "garden-fresh-salad", "basePrice": 35000, "badge": "bestseller", "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", "description": "Mixed greens, cherry tomato, cucumber, house dressing", "rating": 4.9, "reviewCount": 128, "stock": 10, "isAvailable": true, "category": { "id": "1", "name": "Salad", "slug": "salad" }, "variants": [] },
  { "id": "2", "name": "Teriyaki Chicken Bowl", "slug": "teriyaki-chicken-bowl", "basePrice": 45000, "badge": "new", "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", "description": "Steamed rice, grilled chicken, teriyaki sauce, sesame", "rating": 4.8, "reviewCount": 94, "stock": 8, "isAvailable": true, "category": { "id": "2", "name": "Rice Bowl", "slug": "rice-bowl" }, "variants": [] },
  { "id": "3", "name": "Green Detox Juice", "slug": "green-detox-juice", "basePrice": 28000, "badge": null, "image": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80", "description": "Spinach, apple, ginger, lemon, cucumber blend", "rating": 4.7, "reviewCount": 76, "stock": 15, "isAvailable": true, "category": { "id": "3", "name": "Drinks", "slug": "drinks" }, "variants": [] },
  { "id": "4", "name": "Overnight Oats", "slug": "overnight-oats", "basePrice": 32000, "badge": null, "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", "description": "Rolled oats, chia seeds, almond milk, mixed berries", "rating": 4.8, "reviewCount": 53, "stock": 12, "isAvailable": true, "category": { "id": "4", "name": "Snack", "slug": "snack" }, "variants": [] },
  { "id": "5", "name": "Quinoa Power Bowl", "slug": "quinoa-power-bowl", "basePrice": 48000, "originalPrice": 55000, "badge": "promo", "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80", "description": "Quinoa, roasted veggies, tahini dressing, seeds", "rating": 4.9, "reviewCount": 112, "stock": 6, "isAvailable": true, "category": { "id": "1", "name": "Salad", "slug": "salad" }, "variants": [{ "id": "v1", "name": "Regular", "additionalPrice": 0 }, { "id": "v2", "name": "Large (+Protein)", "additionalPrice": 15000 }] },
  { "id": "6", "name": "Açaí Bowl", "slug": "acai-bowl", "basePrice": 52000, "badge": null, "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", "description": "Blended açaí, granola, fresh fruits, honey drizzle", "rating": 4.9, "reviewCount": 145, "stock": 0, "isAvailable": false, "category": { "id": "4", "name": "Snack", "slug": "snack" }, "variants": [] }
]
```

### Categories
```json
[
  { "id": "1", "name": "Salad",     "slug": "salad",     "count": 4 },
  { "id": "2", "name": "Rice Bowl", "slug": "rice-bowl", "count": 3 },
  { "id": "3", "name": "Drinks",    "slug": "drinks",    "count": 3 },
  { "id": "4", "name": "Snack",     "slug": "snack",     "count": 2 }
]
```

### Bundles
```json
[
  { "id": "1", "name": "Healthy Starter", "slug": "healthy-starter", "description": "Perfect for a light & nutritious meal.", "price": 79000, "originalPrice": 95000, "isPopular": false, "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80", "items": [] },
  { "id": "2", "name": "Full Day Pack",   "slug": "full-day-pack",   "description": "Complete nutrition for your entire day.", "price": 125000, "originalPrice": 140000, "isPopular": true, "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80", "items": [] },
  { "id": "3", "name": "Family Pack",     "slug": "family-pack",     "description": "Feed the whole family with goodness.", "price": 215000, "originalPrice": 256000, "isPopular": false, "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", "items": [] }
]
```

---

## Section 12: Integration Checklist

Frontend is ready to connect once all items below are available:

```
AUTH:
[ ] POST /api/auth/login       → returns { token, user }
[ ] POST /api/auth/register    → returns { token, user }
[ ] GET  /api/auth/me          → returns { data: User } (Bearer token)

PRODUCTS:
[ ] GET  /api/products         → paginated Product[] with query filter support
[ ] GET  /api/products/:slug   → single Product with variants[]

CATEGORIES:
[ ] GET  /api/categories       → Category[]

BUNDLES:
[ ] GET  /api/bundles          → Bundle[] with items[]

ORDERS:
[ ] POST /api/orders           → create Order, returns { data: Order }
[ ] GET  /api/orders           → paginated Order[] for authenticated user

PAYMENTS:
[ ] POST /api/payments/initiate → { data: { paymentUrl: string } }

ADMIN (all require role ADMIN):
[ ] GET    /api/admin/stats
[ ] GET    /api/admin/products
[ ] POST   /api/admin/products
[ ] PUT    /api/admin/products/:id
[ ] DELETE /api/admin/products/:id
[ ] GET    /api/admin/orders
[ ] GET    /api/admin/orders?status=...
[ ] PATCH  /api/admin/orders/:id
[ ] GET    /api/admin/categories
[ ] POST   /api/admin/categories
[ ] PUT    /api/admin/categories/:id
[ ] DELETE /api/admin/categories/:id
[ ] GET    /api/admin/bundles
[ ] POST   /api/admin/bundles
[ ] PUT    /api/admin/bundles/:id
[ ] DELETE /api/admin/bundles/:id
```

---

## Summary

| Metric | Count |
|---|---|
| Total API endpoints | **28** |
| Data models | **7** (Product, ProductVariant, Category, Bundle, BundleItem, Order, OrderItem, User) |
| Enum types | **5** (OrderStatus, OrderType, UserRole, PaymentStatus, ProductBadge) |
| Pages requiring auth | **7** (/checkout, /orders, /admin, /admin/products, /admin/orders, /admin/categories, /admin/bundles) |
| Admin-only pages | **5** (/admin, /admin/products, /admin/orders, /admin/categories, /admin/bundles) |
| Public pages | **6** (/, /menu, /menu/[slug], /cart, /auth/login, /auth/register) |
| Third-party integrations | **1** (Midtrans — payment gateway) |
