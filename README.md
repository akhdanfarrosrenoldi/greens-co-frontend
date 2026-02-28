# 🥗 Greens & Co. — Frontend

A modern healthy food delivery web app built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| State Management | Zustand 5 |
| HTTP Client | Axios |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Icons | Lucide React |
| UI Primitives | Radix UI + shadcn/ui |
| Notifications | Sonner |
| Linting | ESLint 9 (flat config) |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── menu/               # Menu listing + product detail
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout page
│   ├── orders/             # Order history
│   ├── auth/               # Login & Register
│   └── admin/              # Admin dashboard (products, orders, bundles, categories)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Homepage sections (Hero, FeaturedMenu, BundleSection, etc.)
│   ├── menu/               # ProductCard, FilterSidebar, CategoryTabs
│   ├── cart/               # Cart drawer
│   ├── admin/              # Admin sidebar + tables
│   └── ui/                 # Reusable UI primitives
├── hooks/                  # useCart, useAuth, useScrollReveal
├── lib/                    # API client, formatters, auth utils
├── store/                  # Zustand stores
├── types/                  # TypeScript type definitions
└── proxy.ts                # Route protection (auth + admin guard)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Featured Menu, Bundles, How It Works, Footer |
| `/menu` | Product listing with category filter + search |
| `/menu/[slug]` | Product detail page |
| `/cart` | Cart review |
| `/checkout` | Checkout form |
| `/orders` | Order history (protected) |
| `/auth/login` | Login page |
| `/auth/register` | Register page |
| `/admin` | Admin dashboard (admin role required) |
| `/admin/products` | Manage products |
| `/admin/orders` | Manage orders |
| `/admin/bundles` | Manage bundles |
| `/admin/categories` | Manage categories |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Form Validation

Forms use **React Hook Form** with **Zod** schema validation.

| Form | Schema | Location |
|---|---|---|
| Login | `{ email, password }` | `src/app/auth/login/page.tsx` |
| Register | `{ name, email, password, confirmPassword }` | `src/app/auth/register/page.tsx` |
| Checkout | `{ name, phone, type, address?, notes?, pickupTime? }` | `src/app/checkout/page.tsx` |

All validation messages are in English.

---

## Authentication

- JWT stored in `localStorage` (`token`, `user` keys)
- Cookies `token` + `role` written after login for Edge Middleware route guards (`src/proxy.ts`)
- Auto-redirect to `/auth/login` on 401 response (Axios interceptor)

---

## Design Tokens

| Token | Value |
|---|---|
| Primary green | `#16a34a` |
| Dark green | `#15803d` |
| Light green | `#dcfce7` |
| Text | `#111827` |
| Muted | `#6b7280` |
| Border | `#e5e7eb` |
| Heading font | Playfair Display |
| Body font | DM Sans |

---

## Environment

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

See [BACKEND_SPEC.md](./BACKEND_SPEC.md) for the full backend API specification — all 28 endpoints, data models, auth flow, and integration checklist.

---

## License

Private project — Greens & Co. © 2026
