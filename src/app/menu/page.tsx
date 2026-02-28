'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Home, ChevronRight as ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import CategoryTabs from '@/components/menu/CategoryTabs'
import FilterSidebar from '@/components/menu/FilterSidebar'
import ProductGrid from '@/components/menu/ProductGrid'
import { Category, Product } from '@/types'
import { getProducts, getCategories } from '@/lib/api'

// ── Mock data fallback ───────────────────────────────────────────────────────
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Salad', slug: 'salad', count: 2 },
  { id: '2', name: 'Rice Bowl', slug: 'rice-bowl', count: 1 },
  { id: '3', name: 'Drinks', slug: 'drinks', count: 1 },
  { id: '4', name: 'Snack', slug: 'snack', count: 2 },
]

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'Garden Fresh Salad', slug: 'garden-fresh-salad',
    description: 'Mixed greens, cherry tomato, cucumber, house dressing',
    basePrice: 35000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    stock: 10, isAvailable: true, rating: 4.9, reviewCount: 124,
    category: { id: '1', name: 'Salad', slug: 'salad' }, variants: [],
  },
  {
    id: '2', name: 'Teriyaki Chicken Bowl', slug: 'teriyaki-chicken-bowl',
    description: 'Steamed rice, grilled chicken, teriyaki sauce, sesame',
    basePrice: 45000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
    stock: 8, isAvailable: true, rating: 4.8, reviewCount: 98,
    category: { id: '2', name: 'Rice Bowl', slug: 'rice-bowl' }, variants: [],
  },
  {
    id: '3', name: 'Green Detox Juice', slug: 'green-detox-juice',
    description: 'Spinach, apple, ginger, lemon, cucumber blend',
    basePrice: 28000, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80',
    stock: 15, isAvailable: true, rating: 4.7, reviewCount: 67,
    category: { id: '3', name: 'Drinks', slug: 'drinks' }, variants: [],
  },
  {
    id: '4', name: 'Overnight Oats', slug: 'overnight-oats',
    description: 'Rolled oats, chia seeds, almond milk, mixed berries',
    basePrice: 32000, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
    stock: 12, isAvailable: true, rating: 4.8, reviewCount: 89,
    category: { id: '4', name: 'Snack', slug: 'snack' }, variants: [],
  },
  {
    id: '5', name: 'Quinoa Power Bowl', slug: 'quinoa-power-bowl',
    description: 'Quinoa, roasted veggies, tahini dressing, seeds',
    basePrice: 48000, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
    stock: 6, isAvailable: true, rating: 4.9, reviewCount: 112,
    category: { id: '1', name: 'Salad', slug: 'salad' }, variants: [],
  },
  {
    id: '6', name: 'Açaí Bowl', slug: 'acai-bowl',
    description: 'Blended açaí, granola, fresh fruits, honey drizzle',
    basePrice: 52000, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
    stock: 0, isAvailable: false, rating: 4.9, reviewCount: 145,
    category: { id: '4', name: 'Snack', slug: 'snack' }, variants: [],
  },
]

function MenuContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(MOCK_PRODUCTS.length)

  const page = parseInt(params.get('page') || '1')
  const LIMIT = 9

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    Promise.all([
      getProducts(Object.fromEntries(params.entries())).catch(() => null),
      getCategories().catch(() => null),
    ])
      .then(([prodRes, catRes]) => {
        if (prodRes?.data) {
          setProducts(prodRes.data.data ?? prodRes.data)
          setTotal(prodRes.data.total ?? prodRes.data.length)
        } else {
          // Fallback: client-side filter the mock data
          const cat = params.get('cat')
          const search = params.get('search')?.toLowerCase()
          let filtered = [...MOCK_PRODUCTS]
          if (cat) filtered = filtered.filter((p) => p.category.slug === cat)
          if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search))
          setProducts(filtered)
          setTotal(filtered.length)
        }
        if (catRes?.data) setCategories(catRes.data.data ?? catRes.data)
      })
      .finally(() => setLoading(false))
  }, [params])

  const totalPages = Math.ceil(total / LIMIT)

  const goPage = (n: number) => {
    const p = new URLSearchParams(params.toString())
    p.set('page', String(n))
    router.push(`/menu?${p.toString()}`)
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#f0fdf4] to-white px-8 md:px-16 pt-12 pb-0 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-2 text-[13px] text-muted mb-5">
          <Link href="/" className="text-green-DEFAULT hover:underline flex items-center gap-1">
            <Home size={12} />
            Home
          </Link>
          <ChevronRightIcon size={12} className="text-muted-light" />
          <span className="text-[#111827]">Menu</span>
        </div>
        <h1 className="font-heading text-4xl font-bold mb-2">Our Fresh Menu</h1>
        <p className="text-[15px] text-muted mb-8">
          Freshly prepared every morning from locally sourced ingredients.
        </p>
        {/* Category Tabs sit at the bottom of the header */}
        <CategoryTabs categories={categories} totalCount={total} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 px-8 md:px-16 pt-8 pb-16">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Grid */}
        <div className="min-w-0">
          <ProductGrid products={products} loading={loading} total={total} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                disabled={page <= 1}
                onClick={() => goPage(page - 1)}
                className="w-9 h-9 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT transition-colors disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => goPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    n === page
                      ? 'bg-green-DEFAULT text-white'
                      : 'border border-[#e5e7eb] text-muted hover:border-green-DEFAULT hover:text-green-DEFAULT'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={page >= totalPages}
                onClick={() => goPage(page + 1)}
                className="w-9 h-9 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT transition-colors disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={null}>
      <MenuContent />
    </Suspense>
  )
}
