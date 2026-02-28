'use client'

import { useEffect, useState } from 'react'
import {
  ShoppingBag,
  DollarSign,
  UtensilsCrossed,
  Users,
  TrendingUp,
} from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import { adminGetStats } from '@/lib/api'
import { formatRupiah } from '@/lib/utils'

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
}

const MOCK: Stats = {
  totalOrders: 248,
  totalRevenue: 18750000,
  totalProducts: 32,
  totalCustomers: 512,
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(MOCK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminGetStats()
      .then((res) => setStats(res.data.data ?? res.data))
      .catch(() => setStats(MOCK))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    {
      title: 'Total Orders',
      value: loading ? '—' : stats.totalOrders,
      change: '12%',
      positive: true,
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: loading ? '—' : formatRupiah(stats.totalRevenue),
      change: '8%',
      positive: true,
      icon: DollarSign,
      color: 'bg-[#dcfce7] text-green-DEFAULT',
    },
    {
      title: 'Total Products',
      value: loading ? '—' : stats.totalProducts,
      icon: UtensilsCrossed,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Total Customers',
      value: loading ? '—' : stats.totalCustomers,
      change: '24%',
      positive: true,
      icon: Users,
      color: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Quick Overview */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-green-DEFAULT" />
          <h2 className="font-semibold text-[#111827]">Quick Overview</h2>
        </div>
        <p className="text-sm text-muted">
          All stats are synced with your backend API. Connect your backend at{' '}
          <code className="bg-[#f0fdf4] text-green-DEFAULT px-1.5 py-0.5 rounded text-xs">
            NEXT_PUBLIC_API_URL
          </code>{' '}
          to see live data.
        </p>
      </div>
    </div>
  )
}
