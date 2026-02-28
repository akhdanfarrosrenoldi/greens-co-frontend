'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/admin/DataTable'
import { Order } from '@/types'
import { adminGetOrders, adminUpdateOrderStatus } from '@/lib/api'
import { formatRupiah, getOrderStatusLabel } from '@/lib/utils'

const ORDER_STATUSES = ['PENDING', 'PAID', 'PROCESSING', 'READY', 'ON_DELIVERY', 'COMPLETED', 'CANCELLED']

const MOCK: Order[] = [
  {
    id: 'ORD-001', status: 'COMPLETED', type: 'DELIVERY',
    totalPrice: 108000, paymentStatus: 'PAID',
    createdAt: '2026-02-25T10:30:00Z', items: [],
  },
  {
    id: 'ORD-002', status: 'PROCESSING', type: 'PICKUP',
    totalPrice: 79000, paymentStatus: 'PAID',
    createdAt: '2026-02-28T08:00:00Z', items: [],
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    adminGetOrders(filter ? { status: filter } : {})
      .then((res) => setOrders(res.data.data ?? res.data))
      .catch(() => setOrders(MOCK))
      .finally(() => setLoading(false))
  }, [filter])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminUpdateOrderStatus(id, status)
      setOrders((o) => o.map((x) => (x.id === id ? { ...x, status: status as Order['status'] } : x)))
    } catch {
      alert('Failed to update status.')
    }
  }

  const columns = [
    { key: 'id', header: 'Order ID' },
    {
      key: 'createdAt',
      header: 'Date',
      render: (row: Order) =>
        new Date(row.createdAt).toLocaleDateString('id-ID', {
          day: '2-digit', month: 'short', year: 'numeric',
        }),
    },
    { key: 'type', header: 'Type' },
    {
      key: 'totalPrice',
      header: 'Total',
      render: (row: Order) => formatRupiah(row.totalPrice),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: Order) => {
        const { label, color } = getOrderStatusLabel(row.status)
        return (
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
            {label}
          </span>
        )
      },
    },
    {
      key: 'actions',
      header: 'Update Status',
      render: (row: Order) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="text-xs border border-[#e5e7eb] rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-DEFAULT"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted mt-1">Manage and update order status</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm border border-[#e5e7eb] rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-DEFAULT bg-white"
        >
          <option value="">All Status</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns as never} data={orders as never} loading={loading} />
    </div>
  )
}
