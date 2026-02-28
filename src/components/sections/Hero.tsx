'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '100px 64px 64px',
        gap: '64px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%)',
      }}
    >
      {/* Left: Content */}
      <div>
        <div className="hero-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          <Leaf size={14} />
          Fresh &amp; Healthy Food
        </div>

        <h1
          className="hero-title font-heading font-bold leading-[1.15] mb-5"
          style={{ fontSize: 'clamp(40px,5vw,64px)' }}
        >
          Fresh Food,<br />
          <span style={{ color: '#16a34a', fontStyle: 'italic' }}>Delivered</span> to<br />
          Your Door.
        </h1>

        <p className="hero-desc text-base text-muted leading-[1.8] max-w-[440px] mb-9">
          Wholesome, freshly prepared meals made from locally sourced ingredients.
          Order now and enjoy healthy eating without the hassle.
        </p>

        <div className="hero-cta flex gap-3.5 items-center">
          <Link
            href="/menu"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px',
              background: '#16a34a',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '100px',
              fontSize: 15,
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
            className="hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.35)] transition-all"
          >
            Order Now
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/menu"
            style={{
              padding: '14px 28px',
              background: 'transparent',
              color: '#111827',
              border: '1.5px solid #e5e7eb',
              borderRadius: '100px',
              fontSize: 15,
              fontWeight: 500,
            }}
            className="hover:border-green-DEFAULT hover:text-green-DEFAULT hover:-translate-y-0.5 transition-all"
          >
            View Menu
          </Link>
        </div>

        <div className="hero-stats" style={{ display: 'flex', gap: 32, marginTop: 48 }}>
          {[
            { num: '500+', label: 'Happy Customers' },
            { num: '30+',  label: 'Menu Items' },
            { num: '4.9★', label: 'Rating' },
          ].map((s) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#16a34a' }}>{s.num}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hero-visual relative hidden md:block">
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '500px',
            borderRadius: '24px',
            boxShadow: '0 32px 80px rgba(22,163,74,0.18)',
          }}
        >
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
          className="absolute bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '28px', left: '-28px', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={18} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Fast Delivery</p>
            <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>30 mins or less</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ top: '28px', right: '-28px', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Leaf size={18} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>100% Fresh</p>
            <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Local ingredients</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
