'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'
import { Order } from '@/types'
import { formatRupiah, getOrderStatusLabel } from '@/lib/utils'
import { getOrders } from '@/lib/api'

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    status: 'COMPLETED',
    type: 'DELIVERY',
    totalPrice: 108000,
    address: 'Jl. Riau No. 10, Bandung',
    paymentStatus: 'PAID',
    createdAt: '2026-02-25T10:30:00Z',
    items: [
      {
        product: {
          id: '1',
          name: 'Garden Fresh Salad',
          slug: 'garden-fresh-salad',
          description: '',
          basePrice: 35000,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
          stock: 10,
          isAvailable: true,
          category: { id: '1', name: 'Salad', slug: 'salad' },
          variants: [],
        },
        qty: 2,
        price: 35000,
      },
    ],
  },
]

function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)
  const { label, color } = getOrderStatusLabel(order.status)
  const date = new Date(order.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f9fafb] transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center shrink-0">
          <Package size={18} className="text-green-DEFAULT" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-semibold text-[#111827]">{order.id}</span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
              {label}
            </span>
          </div>
          <p className="text-xs text-muted">{date}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-[#111827]">{formatRupiah(order.totalPrice)}</p>
          <p className="text-xs text-muted mt-0.5">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </p>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-muted shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-muted shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-[#e5e7eb] p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted mb-1 uppercase tracking-wider font-medium">
                Order Type
              </p>
              <p className="font-medium">{order.type}</p>
            </div>
            {order.address && (
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider font-medium">
                  Address
                </p>
                <p className="font-medium">{order.address}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted uppercase tracking-wider font-medium">Items</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {item.product.name}
                  {item.variant && (
                    <span className="text-muted"> ({item.variant.name})</span>
                  )}{' '}
                  x{item.qty}
                </span>
                <span className="font-medium">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data.data ?? res.data))
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pb-24 px-8 md:px-16">
      <div className="max-w-3xl mx-auto pt-8">
        <h1 className="font-heading text-3xl font-bold mb-8">Order History</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white rounded-2xl border border-[#e5e7eb] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <Package size={48} className="text-green-mid mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-sm text-muted">Your order history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
