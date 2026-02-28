'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Package, Truck, Store, Home, ChevronRight } from 'lucide-react'
import { Order } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { getOrders } from '@/lib/api'
import StatusBadge from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'

const MOCK_ORDERS: Order[] = [
  {
    id: 'GC-2024-001',
    status: 'COMPLETED',
    type: 'DELIVERY',
    totalPrice: 108000,
    address: 'Jl. Riau No. 10, Bandung',
    paymentStatus: 'PAID',
    createdAt: '2026-02-25T10:30:00Z',
    items: [
      {
        product: {
          id: '1', name: 'Garden Fresh Salad', slug: 'garden-fresh-salad',
          description: '', basePrice: 35000,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&q=80',
          stock: 10, isAvailable: true,
          category: { id: '1', name: 'Salad', slug: 'salad' }, variants: [],
        },
        qty: 2, price: 35000,
      },
      {
        product: {
          id: '2', name: 'Teriyaki Chicken Bowl', slug: 'teriyaki-chicken-bowl',
          description: '', basePrice: 45000,
          image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=100&q=80',
          stock: 8, isAvailable: true,
          category: { id: '2', name: 'Rice Bowl', slug: 'rice-bowl' }, variants: [],
        },
        qty: 1, price: 45000,
      },
    ],
  },
  {
    id: 'GC-2024-002',
    status: 'ON_DELIVERY',
    type: 'DELIVERY',
    totalPrice: 89000,
    address: 'Jl. Dago No. 5, Bandung',
    paymentStatus: 'PAID',
    createdAt: '2026-02-28T08:00:00Z',
    items: [
      {
        product: {
          id: '3', name: 'Green Detox Juice', slug: 'green-detox-juice',
          description: '', basePrice: 30000,
          image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=100&q=80',
          stock: 5, isAvailable: true,
          category: { id: '3', name: 'Drinks', slug: 'drinks' }, variants: [],
        },
        qty: 3, price: 30000,
      },
    ],
  },
]

function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)
  const date = new Date(order.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const previewItems = order.items.slice(0, 3)
  const extraCount = order.items.length - 3

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left hover:bg-[#f9fafb] transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-sm font-semibold text-[#111827]"># {order.id}</span>
              <StatusBadge status={order.status} />
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                order.type === 'DELIVERY'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                {order.type === 'DELIVERY' ? <Truck size={11} /> : <Store size={11} />}
                {order.type === 'DELIVERY' ? 'Delivery' : 'Pickup'}
              </span>
            </div>
            <p className="text-xs text-muted">{date}</p>
            {/* Item previews */}
            <div className="flex items-center gap-1.5 mt-3">
              {previewItems.map((item, i) => (
                <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#e5e7eb]">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {extraCount > 0 && (
                <div className="w-12 h-12 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center">
                  <span className="text-xs text-muted font-medium">+{extraCount}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <p className="font-bold text-[#111827] text-base">{formatRupiah(order.totalPrice)}</p>
            <div className="flex items-center gap-1 text-xs text-muted">
              View detail
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-[#e5e7eb] p-5 space-y-4 bg-[#fafafa]">
          {/* Delivery info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted mb-1 uppercase tracking-wider font-medium">Order Type</p>
              <p className="font-medium">{order.type}</p>
            </div>
            {order.address && (
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider font-medium">Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
            )}
          </div>

          {/* Items list */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wider font-medium mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product.name}
                      {item.variant && <span className="text-muted font-normal"> ({item.variant.name})</span>}
                    </p>
                    <p className="text-xs text-muted">x{item.qty}</p>
                  </div>
                  <span className="text-sm font-semibold shrink-0">{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total breakdown */}
          <div className="border-t border-[#e5e7eb] pt-3 text-sm">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-green-DEFAULT">{formatRupiah(order.totalPrice)}</span>
            </div>
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
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 pt-6 pb-4 text-[13px] text-muted">
          <Link href="/" className="hover:text-green-DEFAULT transition-colors flex items-center gap-1">
            <Home size={13} />
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#111827] font-medium">My Orders</span>
        </div>

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold">My Orders</h1>
          <p className="text-sm text-muted mt-1">Track and manage your order history</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl border border-[#e5e7eb] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            desc="Start ordering fresh food!"
            actionLabel="Browse Menu"
            actionHref="/menu"
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

