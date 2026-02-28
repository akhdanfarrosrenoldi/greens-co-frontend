'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Star, Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'

interface ProductCardProps {
  product: Product
}

const BADGE_CONFIG = {
  bestseller: { label: 'Best Seller', className: 'bg-green-DEFAULT' },
  new: { label: 'New', className: 'bg-amber-400' },
  promo: { label: 'Promo', className: 'bg-red-500' },
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
          <span
            className={`absolute top-[10px] left-[10px] ${badge.className} text-white text-[11px] font-semibold px-2.5 py-[3px] rounded-full pointer-events-none`}
          >
            {badge.label}
          </span>
        )}
        {/* Wishlist — always visible */}
        <button
          className="absolute top-[10px] right-[10px] w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted hover:text-red-500 hover:scale-110 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </div>

      <div className="p-[14px]">
        {/* Category */}
        <p className="text-[11px] text-green-DEFAULT font-semibold uppercase tracking-[1px] mb-1">
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
            <span className="text-[17px] font-bold text-green-DEFAULT">
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
            className="w-[34px] h-[34px] bg-green-DEFAULT text-white rounded-full flex items-center justify-center hover:bg-green-dark hover:scale-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
