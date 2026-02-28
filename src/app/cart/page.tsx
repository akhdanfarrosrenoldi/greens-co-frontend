'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'

const DELIVERY_FEE = 10000

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-8">
        <div className="w-24 h-24 rounded-full bg-[#f0fdf4] flex items-center justify-center">
          <ShoppingBag size={40} className="text-green-DEFAULT" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted text-sm">Start adding some fresh items to your order!</p>
        </div>
        <Link
          href="/menu"
          className="flex items-center gap-2 px-8 py-3.5 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark transition-colors"
        >
          Browse Menu
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  const total = totalPrice + DELIVERY_FEE

  return (
    <div className="pb-24 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pt-8">
          <h1 className="font-heading text-3xl font-bold">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-[#e5e7eb]"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#111827]">{item.name}</h3>
                  {item.variantName && (
                    <p className="text-xs text-muted mt-0.5">{item.variantName}</p>
                  )}
                  <p className="text-green-DEFAULT font-bold mt-1">
                    {formatRupiah(item.price)}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-muted italic mt-1">Note: {item.notes}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.productId, item.variantId, item.qty - 1)}
                      className="w-7 h-7 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.variantId, item.qty + 1)}
                      className="w-7 h-7 rounded-lg bg-green-DEFAULT text-white flex items-center justify-center hover:bg-green-dark transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-sm font-bold">{formatRupiah(item.price * item.qty)}</p>
                </div>
              </div>
            ))}

            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-sm text-green-DEFAULT font-medium hover:gap-2.5 transition-all"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 h-fit sticky top-24">
            <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">{formatRupiah(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Delivery Fee</span>
                <span className="font-medium">{formatRupiah(DELIVERY_FEE)}</span>
              </div>
              <div className="border-t border-[#e5e7eb] pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-green-DEFAULT text-lg">{formatRupiah(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark transition-all hover:-translate-y-px shadow-[0_4px_16px_rgba(22,163,74,0.3)]"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
