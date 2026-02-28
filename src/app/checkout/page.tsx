'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, Store, Loader2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'
import { createOrder, initiatePayment } from '@/lib/api'
import { CheckoutForm } from '@/types'

const DELIVERY_FEE = 10000

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    type: 'DELIVERY',
    address: '',
    notes: '',
    pickupTime: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isDelivery = form.type === 'DELIVERY'
  const total = totalPrice + (isDelivery ? DELIVERY_FEE : 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return setError('Please fill in all required fields.')
    if (isDelivery && !form.address) return setError('Delivery address is required.')
    setError('')
    setLoading(true)
    try {
      const orderRes = await createOrder({
        ...form,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          qty: i.qty,
          price: i.price,
          notes: i.notes,
        })),
      })
      const orderId = orderRes.data.data?.id ?? orderRes.data.id
      const payRes = await initiatePayment(orderId)
      const payUrl = payRes.data.data?.paymentUrl ?? payRes.data.paymentUrl
      clearCart()
      if (payUrl) window.location.href = payUrl
      else router.push('/orders')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-24 px-8 md:px-16">
      <div className="max-w-4xl mx-auto pt-8">
        <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-6">
            {/* Delivery / Pickup Toggle */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <p className="text-sm font-semibold mb-4">Order Type</p>
              <div className="grid grid-cols-2 gap-3">
                {(['DELIVERY', 'PICKUP'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type }))}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.type === type
                        ? 'border-green-DEFAULT bg-[#f0fdf4] text-green-DEFAULT'
                        : 'border-[#e5e7eb] hover:border-green-DEFAULT'
                    }`}
                  >
                    {type === 'DELIVERY' ? <Truck size={20} /> : <Store size={20} />}
                    {type === 'DELIVERY' ? 'Delivery' : 'Pickup'}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 space-y-4">
              <p className="text-sm font-semibold">Contact Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+62..."
                    className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                  />
                </div>
              </div>

              {isDelivery ? (
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Full delivery address..."
                    className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors resize-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={form.pickupTime}
                    onChange={handleChange}
                    min="07:00"
                    max="21:00"
                    className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                  />
                  <p className="text-xs text-muted mt-1.5">Available: 07:00 – 21:00 WIB</p>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-muted block mb-1.5">
                  Order Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Any special requests?"
                  className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors resize-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
            )}
          </div>

          {/* Summary */}
          <div className="h-fit sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <h2 className="font-heading text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map((i) => (
                  <div
                    key={`${i.productId}-${i.variantId}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted truncate max-w-[180px]">
                      {i.name} x{i.qty}
                    </span>
                    <span className="font-medium shrink-0">{formatRupiah(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e5e7eb] pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                {isDelivery && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Delivery</span>
                    <span>{formatRupiah(DELIVERY_FEE)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base border-t border-[#e5e7eb] pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-green-DEFAULT">{formatRupiah(total)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark transition-all hover:-translate-y-px shadow-[0_4px_16px_rgba(22,163,74,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Pay Now — {formatRupiah(total)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
