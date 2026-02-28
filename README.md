# 🥗 Greens & Co. — Frontend

A modern healthy food delivery web app built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + inline styles |
| State Management | Zustand 5 |
| HTTP Client | Axios |
| Icons | Lucide React |
| UI Primitives | Radix UI |
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
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## License

Private project — Greens & Co. © 2026
