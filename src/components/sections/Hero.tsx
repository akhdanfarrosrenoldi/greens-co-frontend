'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Leaf } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16 pt-[100px] pb-16 gap-16 bg-gradient-to-br from-[#f0fdf4] to-white relative overflow-hidden">
      {/* BG circle */}
      <div className="absolute -top-36 -right-36 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Left: Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#dcfce7] text-[#15803d] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
        >
          <Leaf size={14} />
          Fresh &amp; Healthy Food
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-[clamp(40px,5vw,64px)] font-bold leading-[1.15] mb-5"
        >
          Fresh Food,
          <br />
          <span className="text-green-DEFAULT italic">Delivered</span> to
          <br />
          Your Door.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base text-muted leading-[1.8] max-w-[440px] mb-9"
        >
          Wholesome, freshly prepared meals made from locally sourced ingredients.
          Order now and enjoy healthy eating without the hassle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex gap-3.5 items-center"
        >
          <Link
            href="/menu"
            className="flex items-center gap-2 px-7 py-3.5 bg-green-DEFAULT text-white rounded-full text-[15px] font-semibold shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.35)] transition-all"
          >
            Order Now
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/menu"
            className="px-7 py-3.5 border-[1.5px] border-[#e5e7eb] rounded-full text-[15px] font-medium text-[#111827] hover:border-green-DEFAULT hover:text-green-DEFAULT hover:-translate-y-0.5 transition-all"
          >
            View Menu
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex gap-8 mt-12"
        >
          {[
            { num: '500+', label: 'Happy Customers' },
            { num: '30+', label: 'Menu Items' },
            { num: '4.9★', label: 'Rating' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-heading text-[28px] font-bold text-green-DEFAULT">
                {num}
              </span>
              <span className="text-[13px] text-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: Visual */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative hidden md:block"
      >
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(22,163,74,0.18)]">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
            alt="Fresh healthy food"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Floating cards */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -left-7 flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        >
          <div className="w-10 h-10 rounded-[10px] bg-[#dcfce7] text-green-DEFAULT flex items-center justify-center">
            <Zap size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#111827]">Fast Delivery</p>
            <p className="text-[11px] text-muted mt-0.5">30 mins or less</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -top-3 -right-7 flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        >
          <div className="w-10 h-10 rounded-[10px] bg-[#dcfce7] text-green-DEFAULT flex items-center justify-center">
            <Leaf size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#111827]">100% Fresh</p>
            <p className="text-[11px] text-muted mt-0.5">Local ingredients</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
