'use client'

import Image from 'next/image'
import { formatRupiah } from '@/lib/utils'

const BUNDLES = [
  {
    id: '1',
    name: 'Healthy Starter',
    description: 'Perfect for a light & nutritious meal to kickstart your day.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    price: 79000,
    originalPrice: 95000,
    items: ['Garden Salad', 'Detox Juice', 'Overnight Oats'],
    isPopular: false,
  },
  {
    id: '2',
    name: 'Full Day Pack',
    description: 'Complete nutrition for your entire day. Breakfast, lunch & drink included.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80',
    price: 125000,
    originalPrice: 140000,
    items: ['Overnight Oats', 'Chicken Bowl', 'Detox Juice', 'Garden Salad'],
    isPopular: true,
  },
  {
    id: '3',
    name: 'Family Pack',
    description: 'Feed the whole family with our hearty bundle. Serves 2–3 people.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    price: 215000,
    originalPrice: 256000,
    items: ['2× Chicken Bowl', '2× Salad', '2× Juice'],
    isPopular: false,
  },
]

export default function BundleSection() {
  return (
    <section id="bundles" className="px-8 md:px-16 py-24">
      <div className="reveal text-center mb-12">
        <span className="section-tag">Bundle Deals</span>
        <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold leading-tight mb-3">
          Save More with Bundles
        </h2>
        <p className="text-[15px] text-muted max-w-[480px] mx-auto leading-relaxed">
          Get more value with our specially curated meal bundles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUNDLES.map((bundle) => {
          const savePct = Math.round(
            ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
          )
          return (
            <div
              key={bundle.id}
              className={`reveal group bg-white rounded-[20px] border overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] transition-all cursor-pointer relative ${
                bundle.isPopular
                  ? 'border-green-DEFAULT shadow-[0_0_0_2px_rgba(22,163,74,0.15)]'
                  : 'border-[#e5e7eb]'
              }`}
            >
              {bundle.isPopular && (
                <span className="absolute top-3.5 right-3.5 z-10 bg-green-DEFAULT text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="h-[200px] overflow-hidden relative">
                <Image
                  src={bundle.image}
                  alt={bundle.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-bold mb-2">{bundle.name}</h3>
                <p className="text-[13px] text-muted leading-[1.6] mb-4">{bundle.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {bundle.items.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#dcfce7] text-[#15803d] text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 700, color: '#16a34a' }}>
                      {formatRupiah(bundle.price)}
                    </p>
                    <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                      <s style={{ marginRight: 4 }}>{formatRupiah(bundle.originalPrice)}</s>
                      Save {savePct}%
                    </p>
                  </div>
                  <button
                    style={{ padding: '10px 20px', background: '#16a34a', color: '#ffffff', border: 'none', borderRadius: 100, fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Order Bundle
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
