'use client'

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
      <div className="reveal text-center mb-16">
        <span className="section-tag">Simple Process</span>
        <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold leading-tight mb-3">
          How to Order
        </h2>
        <p className="text-[15px] text-muted max-w-[480px] mx-auto leading-relaxed">
          Get your fresh meal in just a few simple steps.
        </p>
      </div>

      <div className="steps-grid">
        {STEPS.map(({ icon: Icon, title, desc, highlight }, i) => {
          const isHighlight = i === 0 || i === STEPS.length - 1
          return (
          <div
            key={title}
            className="step-item reveal"
          >
            <div
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: isHighlight ? '#16a34a' : 'white',
                border: `2px solid ${isHighlight ? '#16a34a' : '#bbf7d0'}`,
                color: isHighlight ? 'white' : '#6b7280',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(22,163,74,0.1)',
                marginBottom: 20,
              }}
            >
              <Icon size={22} />
            </div>
            <h3 className="font-heading text-[17px] font-semibold mb-2">{title}</h3>
            <p className="text-[13px] text-muted leading-[1.6]">{desc}</p>
          </div>
          )
        })}
      </div>
    </section>
  )
}
