'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FEATURED = [
  {
    id: '1',
    name: 'Garden Fresh Salad',
    slug: 'garden-fresh-salad',
    category: 'Salad',
    description: 'Mixed greens, cherry tomato, cucumber, house dressing',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    badge: 'bestseller',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Teriyaki Chicken Bowl',
    slug: 'teriyaki-chicken-bowl',
    category: 'Rice Bowl',
    description: 'Steamed rice, grilled chicken, teriyaki sauce, sesame',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
    badge: 'new',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Green Detox Juice',
    slug: 'green-detox-juice',
    category: 'Drinks',
    description: 'Spinach, apple, ginger, lemon, cucumber blend',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80',
    badge: null,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Overnight Oats',
    slug: 'overnight-oats',
    category: 'Snack',
    description: 'Rolled oats, chia seeds, almond milk, mixed berries',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
    badge: null,
    rating: 4.8,
  },
]

export default function FeaturedMenu() {
  const { addToCart } = useCart()
  const [btnHovered, setBtnHovered] = useState(false)
  useScrollReveal()

  return (
    <section className="bg-[#f9fafb] px-8 md:px-16 py-24">
      <div className="reveal flex flex-col md:flex-row md:justify-between md:items-end mb-12">
        <div>
          <span className="section-tag">Our Menu</span>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold leading-tight mb-3">
            Today&apos;s Featured Menu
          </h2>
          <p className="text-[15px] text-muted max-w-[480px] leading-relaxed">
            Freshly prepared every morning. Limited stock available daily.
          </p>
        </div>
        <button
          onClick={() => { window.location.href = '/menu' }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            color: '#16a34a',
            fontSize: 14, fontWeight: 600,
            background: 'none', border: 'none',
            display: 'flex', alignItems: 'center',
            gap: btnHovered ? 10 : 6,
            transition: 'gap 0.2s',
            cursor: 'pointer',
            marginTop: 0,
          }}
        >
          View All Menu
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED.map((item) => (
          <div
            key={item.id}
            className="reveal bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer group"
          >
            <Link href={`/menu/${item.slug}`}>
              <div className="h-[200px] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge === 'bestseller' && (
                  <div style={{ position: 'absolute', top: 12, left: 12, background: '#16a34a', color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100 }}>
                    Best Seller
                  </div>
                )}
                {item.badge === 'new' && (
                  <div style={{ position: 'absolute', top: 12, left: 12, background: '#f59e0b', color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100 }}>
                    New
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <p style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                {item.category}
              </p>
              <Link href={`/menu/${item.slug}`}>
                <h3 className="font-heading text-[17px] font-semibold mb-1.5 hover:text-green-DEFAULT transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-[13px] text-muted leading-[1.5] mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 17, fontWeight: 700, color: '#16a34a' }}>
                  {formatRupiah(item.price)}
                </span>
                <button
                  onClick={() =>
                    addToCart({
                      productId: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      qty: 1,
                    })
                  }
                  style={{ width: 34, height: 34, background: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.transform = 'scale(1.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
