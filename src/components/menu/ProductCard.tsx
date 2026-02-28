'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Star, Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

const BADGE_CONFIG: Record<string, { label: string; bg: string }> = {
  bestseller: { label: 'Best Seller', bg: '#16a34a' },
  new: { label: 'New', bg: '#f59e0b' },
  promo: { label: 'Promo', bg: '#ef4444' },
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const stockLabel =
    product.stock === 0
      ? 'Sold Out'
      : product.stock <= 5
      ? 'Stok Terbatas'
      : 'In Stock'

  const stockColor =
    product.stock === 0
      ? 'text-red-500'
      : product.stock <= 5
      ? 'text-amber-500'
      : 'text-green-DEFAULT'

  const badge = product.badge ? BADGE_CONFIG[product.badge] : null

  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] transition-all duration-200 group">
      {/* Image wrapper */}
      <div className="h-[200px] relative overflow-hidden">
        <Link href={`/menu/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-[#111827] text-xs font-semibold px-3 py-1 rounded-full">
                Sold Out
              </span>
            </div>
          )}
        </Link>
        {/* Badge */}
        {badge && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: badge.bg, color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, pointerEvents: 'none' }}>
            {badge.label}
          </div>
        )}
        {/* Wishlist — always visible */}
        <button
          onClick={() => setLiked(prev => !prev)}
          className={`
            absolute top-[10px] right-[10px]
            w-8 h-8 rounded-full
            bg-white
            flex items-center justify-center
            shadow-[0_2px_8px_rgba(0,0,0,0.1)]
            transition-all duration-200
            hover:scale-110
            active:scale-95
            ${liked ? 'text-red-500' : 'text-muted hover:text-red-500'}
          `}
          aria-label="Add to wishlist"
        >
          <Heart
            size={15}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="p-[14px]">
        {/* Category */}
        <p style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
          {product.category.name}
        </p>
        {/* Name */}
        <Link href={`/menu/${product.slug}`}>
          <h3 className="font-heading text-[16px] font-semibold mb-1 hover:text-green-DEFAULT transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {/* Description */}
        <p className="text-[12px] text-muted leading-[1.5] mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Meta: rating • stock */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} className="fill-amber-400 text-amber-400 flex-shrink-0" />
          <span className="text-[12px] text-muted font-medium">
            {product.rating?.toFixed(1) ?? '4.8'}
          </span>
          <span className="text-[12px] text-muted">
            ({product.reviewCount ?? 0})
          </span>
          {/* 3px dot separator */}
          <span className="w-[3px] h-[3px] rounded-full bg-muted-light flex-shrink-0" />
          <span className={`text-[12px] font-medium ${stockColor}`}>
            {stockLabel}
          </span>
        </div>

        {/* Footer: price + add button */}
        <div className="flex items-center justify-between">
          <div>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#16a34a' }}>
              {formatRupiah(product.basePrice)}
            </span>
            {product.originalPrice && product.originalPrice > product.basePrice && (
              <span className="text-[12px] text-muted line-through ml-1">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            disabled={!product.isAvailable}
            onClick={() =>
              addToCart({
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.basePrice,
                qty: 1,
              })
            }
            style={{ width: 34, height: 34, background: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}
            className="disabled:opacity-40 disabled:cursor-not-allowed"
            onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.transform = 'scale(1.1)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
