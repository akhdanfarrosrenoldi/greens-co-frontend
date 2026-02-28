'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  LayoutGrid,
  Leaf,
  Utensils,
  GlassWater,
  Sandwich,
  type LucideIcon,
} from 'lucide-react'
import { Category } from '@/types'

interface CategoryTabsProps {
  categories: Category[]
  totalCount?: number
}

const SLUG_ICONS: Record<string, LucideIcon> = {
  all: LayoutGrid,
  salad: Leaf,
  'rice-bowl': Utensils,
  drinks: GlassWater,
  snack: Sandwich,
}

export default function CategoryTabs({ categories, totalCount }: CategoryTabsProps) {
  const router = useRouter()
  const params = useSearchParams()
  const current = params.get('cat') || 'all'

  const all: Category[] = [
    { id: 'all', name: 'All', slug: 'all', count: totalCount },
    ...categories,
  ]

  const handleClick = (slug: string) => {
    const p = new URLSearchParams(params.toString())
    if (slug === 'all') p.delete('cat')
    else p.set('cat', slug)
    p.delete('page')
    router.push(`/menu?${p.toString()}`)
  }

  return (
    <div className="flex gap-0 overflow-x-auto border-b border-[#e5e7eb]">
      {all.map((cat) => {
        const Icon = SLUG_ICONS[cat.slug] ?? LayoutGrid
        const isActive = current === cat.slug
        return (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.slug)}
            className={`cat-tab${isActive ? ' active' : ''}`}
          >
            <Icon size={14} />
            {cat.name}
            {cat.count !== undefined && (
              <span className="cat-count">
                {cat.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
