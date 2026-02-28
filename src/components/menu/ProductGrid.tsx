'use client'

import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  total?: number
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] animate-pulse">
      <div className="h-[200px] bg-[#f0fdf4]" />
      <div className="p-[14px] space-y-3">
        <div className="h-3 w-16 bg-[#dcfce7] rounded-full" />
        <div className="h-4 w-3/4 bg-[#f9fafb] rounded" />
        <div className="h-3 w-full bg-[#f9fafb] rounded" />
        <div className="h-3 w-5/6 bg-[#f9fafb] rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-20 bg-[#dcfce7] rounded" />
          <div className="w-8 h-8 bg-[#f0fdf4] rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading, total }: ProductGridProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center py-24 text-center">
        <div className="text-5xl mb-4">🥗</div>
        <h3 className="font-heading text-xl font-semibold mb-2">No products found</h3>
        <p className="text-sm text-muted-light">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Grid header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted">
          Showing{' '}
          <span className="font-semibold text-[#111827]">{products.length}</span>
          {total !== undefined && (
            <>
              {' '}of{' '}
              <span className="font-semibold text-[#111827]">{total}</span>
            </>
          )}{' '}
          products
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setView('grid')}
            className={`w-[34px] h-[34px] rounded-lg border flex items-center justify-center transition-all ${
              view === 'grid'
                ? 'bg-green-DEFAULT border-green-DEFAULT text-white'
                : 'border-[#e5e7eb] text-muted hover:border-green-DEFAULT hover:text-green-DEFAULT'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`w-[34px] h-[34px] rounded-lg border flex items-center justify-center transition-all ${
              view === 'list'
                ? 'bg-green-DEFAULT border-green-DEFAULT text-white'
                : 'border-[#e5e7eb] text-muted hover:border-green-DEFAULT hover:text-green-DEFAULT'
            }`}
            aria-label="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
            : 'flex flex-col gap-4'
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

