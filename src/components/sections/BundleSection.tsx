'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="section-tag">Bundle Deals</span>
        <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold leading-tight mb-3">
          Save More with Bundles
        </h2>
        <p className="text-[15px] text-muted max-w-[480px] mx-auto leading-relaxed">
          Get more value with our specially curated meal bundles.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUNDLES.map((bundle, i) => {
          const savePct = Math.round(
            ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
          )
          return (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`group bg-white rounded-[20px] border overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] transition-all cursor-pointer relative ${
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
                    <p className="text-xl font-bold text-green-DEFAULT">
                      {formatRupiah(bundle.price)}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      <s>{formatRupiah(bundle.originalPrice)}</s>
                      <span className="ml-1 text-green-DEFAULT font-medium">
                        Save {savePct}%
                      </span>
                    </p>
                  </div>
                  <button className="px-5 py-2.5 bg-green-DEFAULT text-white rounded-full text-xs font-semibold font-body hover:bg-green-dark hover:-translate-y-px transition-all">
                    Order Bundle
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
