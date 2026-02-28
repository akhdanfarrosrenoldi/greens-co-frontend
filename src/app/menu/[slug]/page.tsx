'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, Star, ShoppingCart, ChevronRight, Home } from 'lucide-react'
import { Product } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { getProductBySlug } from '@/lib/api'
import { useCart } from '@/hooks/useCart'

const MOCK: Product = {
  id: '1',
  name: 'Garden Fresh Salad',
  slug: 'garden-fresh-salad',
  description:
    'A vibrant mix of farm-fresh greens, cherry tomatoes, crispy cucumber slices, and our signature house dressing. Perfect for a light yet satisfying meal.',
  basePrice: 35000,
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  stock: 10,
  isAvailable: true,
  rating: 4.9,
  reviewCount: 124,
  category: { id: '1', name: 'Salad', slug: 'salad' },
  variants: [
    { id: 'v1', name: 'Regular', additionalPrice: 0 },
    { id: 'v2', name: 'Large (+Protein)', additionalPrice: 15000 },
  ],
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [notes, setNotes] = useState('')
  const { addToCart, openCart } = useCart()

  useEffect(() => {
    getProductBySlug(slug)
      .then((res) => setProduct(res.data.data ?? res.data))
      .catch(() => setProduct(MOCK))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="px-16 py-12 animate-pulse">
        <div className="grid grid-cols-2 gap-16">
          <div className="h-[500px] bg-[#f0fdf4] rounded-3xl" />
          <div className="space-y-4 pt-8">
            <div className="h-4 w-20 bg-[#dcfce7] rounded-full" />
            <div className="h-10 w-3/4 bg-[#f9fafb] rounded" />
            <div className="h-6 w-24 bg-[#dcfce7] rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) return null

  const activeVariant = product.variants.find((v) => v.id === selectedVariant)
  const finalPrice = product.basePrice + (activeVariant?.additionalPrice ?? 0)

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: finalPrice,
      variantId: selectedVariant || undefined,
      variantName: activeVariant?.name,
      qty,
      notes: notes || undefined,
    })
    openCart()
  }

  return (
    <div className="pb-24">
      <div className="px-8 md:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted py-6">
          <Link href="/" className="text-green-DEFAULT hover:underline flex items-center gap-1">
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/menu" className="text-green-DEFAULT hover:underline">Menu</Link>
          <ChevronRight size={12} />
          <span className="text-[#111827]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(22,163,74,0.15)]">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>

          {/* Info */}
          <div>
            <span className="inline-block bg-[#dcfce7] text-[#15803d] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
              {product.category.name}
            </span>
            <h1 className="font-heading text-4xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-green-DEFAULT">
                {formatRupiah(finalPrice)}
              </span>
              {activeVariant && activeVariant.additionalPrice > 0 && (
                <span className="text-sm text-muted">
                  (+{formatRupiah(activeVariant.additionalPrice)} for {activeVariant.name})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(product.rating ?? 0)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[#e5e7eb]'
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating?.toFixed(1)}</span>
              <span className="text-sm text-muted">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-[15px] text-muted leading-relaxed mb-8">{product.description}</p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Select Variant</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id === selectedVariant ? '' : v.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedVariant === v.id
                          ? 'bg-green-DEFAULT text-white border-green-DEFAULT'
                          : 'border-[#e5e7eb] hover:border-green-DEFAULT'
                      }`}
                    >
                      {v.name}
                      {v.additionalPrice > 0 && (
                        <span className="ml-1 opacity-70">
                          +{formatRupiah(v.additionalPrice)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 rounded-xl border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-10 h-10 rounded-xl bg-green-DEFAULT text-white flex items-center justify-center hover:bg-green-dark transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <p className="text-sm font-semibold mb-2">Special Notes (optional)</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. no onion, extra sauce..."
                className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-DEFAULT text-white rounded-full text-base font-semibold shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:bg-green-dark hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              {product.isAvailable ? 'Add to Cart' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
