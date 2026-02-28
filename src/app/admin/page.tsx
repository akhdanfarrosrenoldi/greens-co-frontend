'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ShoppingBag,
  TrendingUp,
  Package,
  Users,
  Plus,
  ArrowRight,
  Layers,
} from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import { adminGetStats, adminGetOrders } from '@/lib/api'
import { formatRupiah } from '@/lib/utils'
import StatusBadge from '@/components/ui/StatusBadge'
import { Order } from '@/types'

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
}

const MOCK_STATS: Stats = {
  totalOrders: 128,
  totalRevenue: 8450000,
  totalProducts: 24,
  totalCustomers: 89,
}

const MOCK_ORDERS: Order[] = [
  { id: 'GC-001', status: 'PENDING', type: 'DELIVERY', totalPrice: 75000, paymentStatus: 'UNPAID', createdAt: '2026-02-28T09:00:00Z', items: [] },
  { id: 'GC-002', status: 'PROCESSING', type: 'PICKUP', totalPrice: 120000, paymentStatus: 'PAID', createdAt: '2026-02-28T08:30:00Z', items: [] },
  { id: 'GC-003', status: 'COMPLETED', type: 'DELIVERY', totalPrice: 95000, paymentStatus: 'PAID', createdAt: '2026-02-28T07:00:00Z', items: [] },
  { id: 'GC-004', status: 'ON_DELIVERY', type: 'DELIVERY', totalPrice: 65000, paymentStatus: 'PAID', createdAt: '2026-02-27T18:00:00Z', items: [] },
  { id: 'GC-005', status: 'CANCELLED', type: 'PICKUP', totalPrice: 45000, paymentStatus: 'REFUNDED', createdAt: '2026-02-27T16:00:00Z', items: [] },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(MOCK_STATS)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      adminGetStats().then((r) => setStats(r.data.data ?? r.data)).catch(() => {}),
      adminGetOrders({ limit: 5 }).then((r) => setOrders(r.data.data ?? r.data)).catch(() => setOrders(MOCK_ORDERS)),
    ]).finally(() => setLoading(false))
  }, [])

  const cards = [
    { title: 'Total Orders', value: loading ? '—' : stats.totalOrders, change: '12%', positive: true, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { title: 'Revenue', value: loading ? '—' : formatRupiah(stats.totalRevenue), change: '8%', positive: true, icon: TrendingUp, color: 'bg-[#dcfce7] text-green-DEFAULT' },
    { title: 'Products', value: loading ? '—' : stats.totalProducts, icon: Package, color: 'bg-purple-50 text-purple-600' },
    { title: 'Customers', value: loading ? '—' : stats.totalCustomers, change: '5 new today', positive: true, icon: Users, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Welcome back! Here’s what’s happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {cards.map((card) => <StatsCard key={card.title} {...card} />)}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 px-5 py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark hover:-translate-y-px transition-all shadow-[0_4px_14px_rgba(22,163,74,0.25)]"
        >
          <Plus size={15} /> Add Product
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 px-5 py-2.5 border border-[#e5e7eb] bg-white text-[#111827] rounded-full text-sm font-semibold hover:border-green-DEFAULT hover:text-green-DEFAULT transition-all"
        >
          <ShoppingBag size={15} /> View Orders
        </Link>
        <Link
          href="/admin/bundles"
          className="flex items-center gap-2 px-5 py-2.5 border border-[#e5e7eb] bg-white text-[#111827] rounded-full text-sm font-semibold hover:border-green-DEFAULT hover:text-green-DEFAULT transition-all"
        >
          <Layers size={15} /> Manage Bundles
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <h2 className="font-semibold text-[#111827]">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm text-green-DEFAULT font-medium hover:underline"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                {['Order ID', 'Date', 'Type', 'Total', 'Status', 'Action'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-6 py-3.5 font-mono text-xs font-semibold text-[#111827]"># {order.id}</td>
                  <td className="px-6 py-3.5 text-muted">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-6 py-3.5 text-muted">{order.type}</td>
                  <td className="px-6 py-3.5 font-medium">{formatRupiah(order.totalPrice)}</td>
                  <td className="px-6 py-3.5"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-3.5">
                    <Link
                      href="/admin/orders"
                      className="text-xs font-medium text-green-DEFAULT hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

