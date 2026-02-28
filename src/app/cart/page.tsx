'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'

const FREE_DELIVERY_THRESHOLD = 100000
const DELIVERY_FEE = 10000

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice } = useCart()

  const isFreeDelivery = totalPrice >= FREE_DELIVERY_THRESHOLD
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE
  const total = totalPrice + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-8">
        <div className="w-24 h-24 rounded-full bg-[#f0fdf4] flex items-center justify-center">
          <ShoppingCart size={40} className="text-green-DEFAULT" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#111827] mb-2">Your cart is empty</h2>
          <p className="text-muted text-sm">Add some items to get started.</p>
        </div>
        <Link
          href="/menu"
          className="flex items-center gap-2 px-6 py-3 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark transition-colors"
        >
          Browse Menu
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-24 px-8 md:px-16">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-[#111827]">Your Cart</h1>
          <p className="text-muted text-sm mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {!isFreeDelivery && (
          <div className="mb-4 flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 text-sm text-[#15803d]">
            <span>🌿</span>
            <span>Free delivery for orders above <strong>{formatRupiah(FREE_DELIVERY_THRESHOLD)}</strong></span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Items list */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex items-start gap-4 bg-white border border-[#e5e7eb] rounded-2xl p-4"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#111827] truncate">{item.name}</p>
                  {item.variantName && (
                    <p className="text-xs text-muted mt-0.5">{item.variantName}</p>
                  )}
                  {item.notes && (
                    <p className="text-xs text-muted italic mt-0.5">&ldquo;{item.notes}&rdquo;</p>
                  )}
                  <p className="text-sm font-semibold text-green-DEFAULT mt-1">{formatRupiah(item.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                  <div className="flex items-center gap-2 border border-[#e5e7eb] rounded-full px-3 py-1.5">
                    <button
                      onClick={() => updateQty(item.productId, item.variantId, item.qty - 1)}
                      className="w-4 h-4 flex items-center justify-center text-muted hover:text-[#111827] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.variantId, item.qty + 1)}
                      className="w-4 h-4 flex items-center justify-center text-muted hover:text-[#111827] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-[#111827]">{formatRupiah(item.price * item.qty)}</p>
                </div>
              </div>
            ))}

            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green-DEFAULT transition-colors mt-2"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="h-fit sticky top-24">
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-4">
              <h2 className="font-heading text-lg font-bold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Delivery</span>
                  <span className={isFreeDelivery ? 'text-green-DEFAULT font-medium' : ''}>
                    {isFreeDelivery ? 'Free' : formatRupiah(DELIVERY_FEE)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-[#e5e7eb] pt-3 mt-1">
                  <span>Total</span>
                  <span className="text-green-DEFAULT">{formatRupiah(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(22,163,74,0.3)]"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/menu"
                className="flex items-center justify-center gap-1.5 w-full py-3 text-sm text-muted hover:text-green-DEFAULT transition-colors"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
