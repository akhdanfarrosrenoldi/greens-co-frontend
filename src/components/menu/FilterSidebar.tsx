'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Check } from 'lucide-react'
import { useState } from 'react'

// ── Reusable filter card wrapper ─────────────────────────────────────────────
function FilterCard({
  title,
  onReset,
  children,
}: {
  title: string
  onReset?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-bold uppercase tracking-[1px] text-muted">
          {title}
        </span>
        {onReset && (
          <button
            onClick={onReset}
            className="text-[11px] font-semibold text-green-DEFAULT hover:text-green-dark transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

// ── Custom checkbox ──────────────────────────────────────────────────────────
function CustomCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <div
      className={`check-item flex items-center gap-3 cursor-pointer${checked ? ' checked' : ''}`}
      onClick={onChange}
    >
      <div className="check-box">
        {checked && <Check size={12} />}
      </div>
      <span className="text-sm text-[#111827]">{label}</span>
    </div>
  )
}

// ── Main sidebar ─────────────────────────────────────────────────────────────
export default function FilterSidebar() {
  const router = useRouter()
  const params = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')
  const [minPrice, setMinPrice] = useState(params.get('min') || '')
  const [maxPrice, setMaxPrice] = useState(params.get('max') || '')

  const applyFilters = (overrides: Record<string, string> = {}) => {
    const p = new URLSearchParams(params.toString())
    const updates = { search, min: minPrice, max: maxPrice, ...overrides }
    Object.entries(updates).forEach(([k, v]) => {
      if (v) p.set(k, v)
      else p.delete(k)
    })
    p.delete('page')
    router.push(`/menu?${p.toString()}`)
  }

  const currentSort = params.get('sort') || 'popular'
  const dietParams = params.getAll('diet')
  const isAvailable = params.get('available') === 'true'

  const SORTS = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ]

  const DIETS = [
    { label: 'Vegan', slug: 'vegan' },
    { label: 'Vegetarian', slug: 'vegetarian' },
    { label: 'Gluten-Free', slug: 'gluten-free' },
    { label: 'High Protein', slug: 'high-protein' },
    { label: 'Low Calorie', slug: 'low-calorie' },
  ]

  const toggleDiet = (slug: string) => {
    const p = new URLSearchParams(params.toString())
    const existing = p.getAll('diet')
    p.delete('diet')
    if (existing.includes(slug)) {
      existing.filter((x) => x !== slug).forEach((x) => p.append('diet', x))
    } else {
      existing.forEach((x) => p.append('diet', x))
      p.append('diet', slug)
    }
    p.delete('page')
    router.push(`/menu?${p.toString()}`)
  }

  return (
    <aside className="w-full space-y-4">
      {/* Search */}
      <FilterCard
        title="Search"
        onReset={() => {
          setSearch('')
          applyFilters({ search: '' })
        }}
      >
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            placeholder="Search menu..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#e5e7eb] rounded-xl bg-surface focus:outline-none focus:bg-white focus:border-green-DEFAULT transition-all"
          />
        </div>
      </FilterCard>

      {/* Sort */}
      <FilterCard title="Sort By">
        <select
          value={currentSort}
          onChange={(e) => applyFilters({ sort: e.target.value })}
          className="w-full px-3 py-2.5 text-sm border border-[#e5e7eb] rounded-xl bg-surface focus:outline-none focus:border-green-DEFAULT transition-colors appearance-none cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FilterCard>

      {/* Price Range */}
      <FilterCard
        title="Price Range (Rp)"
        onReset={() => {
          setMinPrice('')
          setMaxPrice('')
          applyFilters({ min: '', max: '' })
        }}
      >
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => applyFilters()}
            placeholder="Min"
            className="w-0 flex-1 px-3 py-2.5 text-sm border border-[#e5e7eb] rounded-xl bg-surface focus:outline-none focus:bg-white focus:border-green-DEFAULT transition-all"
          />
          <span className="text-muted-light text-sm font-medium flex-shrink-0">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => applyFilters()}
            placeholder="Max"
            className="w-0 flex-1 px-3 py-2.5 text-sm border border-[#e5e7eb] rounded-xl bg-surface focus:outline-none focus:bg-white focus:border-green-DEFAULT transition-all"
          />
        </div>
      </FilterCard>

      {/* Availability */}
      <FilterCard
        title="Availability"
        onReset={() => applyFilters({ available: '' })}
      >
        <CustomCheckbox
          checked={isAvailable}
          onChange={() => applyFilters({ available: isAvailable ? '' : 'true' })}
          label="In Stock Only"
        />
      </FilterCard>

      {/* Diet Type */}
      <FilterCard
        title="Diet Type"
        onReset={() => {
          const p = new URLSearchParams(params.toString())
          p.delete('diet')
          p.delete('page')
          router.push(`/menu?${p.toString()}`)
        }}
      >
        <div className="space-y-3">
          {DIETS.map((d) => (
            <CustomCheckbox
              key={d.slug}
              checked={dietParams.includes(d.slug)}
              onChange={() => toggleDiet(d.slug)}
              label={d.label}
            />
          ))}
        </div>
      </FilterCard>
    </aside>
  )
}
