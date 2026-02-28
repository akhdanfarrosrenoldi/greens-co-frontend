'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'

const FEATURED = [
  {
    id: '1',
    name: 'Garden Fresh Salad',
    slug: 'garden-fresh-salad',
    category: 'Salad',
    description: 'Mixed greens, cherry tomato, cucumber, house dressing',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    badge: 'Best Seller',
    badgeColor: 'bg-green-DEFAULT',
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
    badge: 'New',
    badgeColor: 'bg-amber-400',
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
    badgeColor: '',
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
    badgeColor: '',
    rating: 4.8,
  },
]

export default function FeaturedMenu() {
  const { addToCart } = useCart()

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
        <Link
          href="/menu"
          className="flex items-center gap-1.5 text-green-DEFAULT text-sm font-semibold mt-4 md:mt-0 hover:gap-3 transition-all"
        >
          View All Menu
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer group"
          >
            <Link href={`/menu/${item.slug}`}>
              <div className="h-[200px] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <span
                    className={`absolute top-3 left-3 ${item.badgeColor} text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
            <div className="p-4">
              <p className="text-[11px] text-green-DEFAULT font-semibold uppercase tracking-[1px] mb-1.5">
                {item.category}
              </p>
              <Link href={`/menu/${item.slug}`}>
                <h3 className="font-heading text-[17px] font-semibold mb-1.5 hover:text-green-DEFAULT transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-[13px] text-muted leading-[1.5] mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[17px] font-bold text-green-DEFAULT">
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
                  className="w-[34px] h-[34px] bg-green-DEFAULT text-white rounded-full flex items-center justify-center hover:bg-green-dark hover:scale-110 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
