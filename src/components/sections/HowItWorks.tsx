'use client'

import { motion } from 'framer-motion'
import { Utensils, ShoppingCart, CreditCard, Smile } from 'lucide-react'

const STEPS = [
  {
    icon: Utensils,
    title: 'Browse Menu',
    desc: 'Explore our fresh daily menu and pick your favorites',
    highlight: true,
  },
  {
    icon: ShoppingCart,
    title: 'Add to Cart',
    desc: 'Select variants, quantities and any special notes',
    highlight: false,
  },
  {
    icon: CreditCard,
    title: 'Checkout',
    desc: 'Choose delivery or pickup, pay securely via Midtrans',
    highlight: false,
  },
  {
    icon: Smile,
    title: 'Enjoy!',
    desc: 'Your fresh meal arrives at your door in 30 minutes',
    highlight: true,
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="bg-[#f0fdf4] px-8 md:px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="section-tag">Simple Process</span>
        <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold leading-tight mb-3">
          How to Order
        </h2>
        <p className="text-[15px] text-muted max-w-[480px] mx-auto leading-relaxed">
          Get your fresh meal in just a few simple steps.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Dashed connector */}
        <div
          className="absolute hidden md:block top-7 left-[12%] right-[12%] h-0.5 z-0"
          style={{
            background:
              'repeating-linear-gradient(90deg, #bbf7d0 0, #bbf7d0 8px, transparent 8px, transparent 16px)',
          }}
        />

        {STEPS.map(({ icon: Icon, title, desc, highlight }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col items-center text-center relative z-10"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(22,163,74,0.1)] ${
                highlight
                  ? 'bg-green-DEFAULT text-white border-2 border-green-DEFAULT'
                  : 'bg-white text-muted border-2 border-[#bbf7d0]'
              }`}
            >
              <Icon size={22} />
            </div>
            <h3 className="font-heading text-[17px] font-semibold mb-2">{title}</h3>
            <p className="text-[13px] text-muted leading-[1.6]">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
