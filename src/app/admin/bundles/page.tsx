'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import DataTable from '@/components/admin/DataTable'
import { Bundle } from '@/types'
import { adminGetBundles, adminDeleteBundle } from '@/lib/api'
import { formatRupiah } from '@/lib/utils'

const MOCK: Bundle[] = [
  {
    id: '1', name: 'Healthy Starter', slug: 'healthy-starter',
    description: 'Perfect for a light & nutritious meal.',
    price: 79000, originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&q=80',
    items: [],
  },
  {
    id: '2', name: 'Full Day Pack', slug: 'full-day-pack',
    description: 'Complete nutrition for your entire day.',
    price: 125000, originalPrice: 140000,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=100&q=80',
    items: [], isPopular: true,
  },
]

export default function AdminBundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminGetBundles()
      .then((res) => setBundles(res.data.data ?? res.data))
      .catch(() => setBundles(MOCK))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this bundle?')) return
    try {
      await adminDeleteBundle(id)
      setBundles((b) => b.filter((x) => x.id !== id))
    } catch {
      alert('Failed to delete bundle.')
    }
  }

  const columns = [
    {
      key: 'image',
      header: 'Image',
      render: (row: Bundle) => (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden">
          <Image src={row.image} alt={row.name} fill className="object-cover" />
        </div>
      ),
    },
    { key: 'name', header: 'Name' },
    {
      key: 'price',
      header: 'Price',
      render: (row: Bundle) => formatRupiah(row.price),
    },
    {
      key: 'originalPrice',
      header: 'Original',
      render: (row: Bundle) => (
        <s className="text-muted">{formatRupiah(row.originalPrice)}</s>
      ),
    },
    {
      key: 'isPopular',
      header: 'Popular',
      render: (row: Bundle) =>
        row.isPopular ? (
          <span className="text-xs bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded-full font-medium">
            Yes
          </span>
        ) : (
          <span className="text-xs text-muted">No</span>
        ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Bundle) => (
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT hover:text-green-DEFAULT transition-colors">
            <Pencil size={14} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold">Bundles</h1>
          <p className="text-sm text-muted mt-1">Manage meal bundle deals</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark transition-colors">
          <Plus size={16} />
          Add Bundle
        </button>
      </div>

      <DataTable columns={columns as never} data={bundles as never} loading={loading} />
    </div>
  )
}
