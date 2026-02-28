'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Truck, Store, Loader2, MapPin, Phone, User, FileText, Clock, CreditCard, ShieldCheck } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'
import { createOrder, initiatePayment } from '@/lib/api'
import { CheckoutForm } from '@/types'

const DELIVERY_FEE = 10000
const FREE_DELIVERY_THRESHOLD = 100000

const PICKUP_TIMES = Array.from({ length: 13 }, (_, i) => {
  const h = (8 + i).toString().padStart(2, '0')
  return `${h}:00`
})

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
  const isFreeDelivery = !isDelivery || totalPrice >= FREE_DELIVERY_THRESHOLD
  const deliveryFee = isDelivery && totalPrice < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0
  const total = totalPrice + deliveryFee

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
              <p className="text-xs font-semibold text-muted uppercase tracking-[1px] mb-4">Order Type</p>
              <div className="inline-flex rounded-full border border-[#e5e7eb] p-1 bg-[#f9fafb] gap-1">
                {(['DELIVERY', 'PICKUP'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type }))}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      form.type === type
                        ? 'bg-green-DEFAULT text-white shadow-sm'
                        : 'text-muted hover:text-[#111827]'
                    }`}
                  >
                    {type === 'DELIVERY' ? <Truck size={15} /> : <Store size={15} />}
                    {type === 'DELIVERY' ? 'Delivery' : 'Pickup'}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 space-y-4">
              <p className="text-xs font-semibold text-muted uppercase tracking-[1px]">
                {isDelivery ? 'Delivery Details' : 'Pickup Details'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full pl-9 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+62..."
                      className="w-full pl-9 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                    />
                  </div>
                </div>
              </div>

              {isDelivery ? (
                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-3.5 text-muted pointer-events-none" />
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Full delivery address..."
                      className="w-full pl-9 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors resize-none"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-medium text-muted block mb-1.5">
                      Pickup Time
                    </label>
                    <div className="relative">
                      <Clock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                      <select
                        name="pickupTime"
                        value={form.pickupTime}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors bg-white appearance-none"
                      >
                        <option value="">Select pickup time...</option>
                        {PICKUP_TIMES.map((t) => (
                          <option key={t} value={t}>{t} WIB</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3">
                    <MapPin size={16} className="text-green-DEFAULT mt-0.5 shrink-0" />
                    <p className="text-sm text-[#15803d]">
                      <span className="font-semibold">Pickup at our store:</span> Jl. Contoh No.1, Bandung — Open 08:00–20:00 WIB
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-medium text-muted block mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FileText size={12} />
                    Order Notes (optional)
                  </span>
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
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>
            )}
          </div>

          {/* Summary */}
          <div className="h-fit sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <h2 className="font-heading text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
                {items.map((i) => (
                  <div
                    key={`${i.productId}-${i.variantId}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image src={i.image} alt={i.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate">{i.name}</p>
                      <p className="text-xs text-muted">x{i.qty}</p>
                    </div>
                    <span className="text-sm font-semibold shrink-0">{formatRupiah(i.price * i.qty)}</span>
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
                    <span className={isFreeDelivery ? 'text-green-DEFAULT font-medium' : ''}>
                      {isFreeDelivery ? 'Free' : formatRupiah(DELIVERY_FEE)}
                    </span>
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
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(22,163,74,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CreditCard size={16} />
              )}
              Pay Now — {formatRupiah(total)}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted">
              <ShieldCheck size={13} className="text-green-DEFAULT" />
              Secured by Midtrans
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
