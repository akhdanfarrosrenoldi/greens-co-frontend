'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import DataTable from '@/components/admin/DataTable'
import ProductForm from '@/components/admin/ProductForm'
import { Product } from '@/types'
import { adminGetProducts, adminDeleteProduct } from '@/lib/api'
import { formatRupiah } from '@/lib/utils'

const MOCK: Product[] = [
  {
    id: '1', name: 'Garden Fresh Salad', slug: 'garden-fresh-salad',
    description: 'Mixed greens, cherry tomato, cucumber, house dressing',
    basePrice: 35000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&q=80',
    stock: 10, isAvailable: true,
    category: { id: '1', name: 'Salad', slug: 'salad' }, variants: [],
  },
  {
    id: '2', name: 'Teriyaki Chicken Bowl', slug: 'teriyaki-chicken-bowl',
    description: 'Steamed rice, grilled chicken, teriyaki sauce',
    basePrice: 45000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=100&q=80',
    stock: 8, isAvailable: true,
    category: { id: '2', name: 'Rice Bowl', slug: 'rice-bowl' }, variants: [],
  },
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const loadProducts = () => {
    adminGetProducts()
      .then((res) => setProducts(res.data.data ?? res.data))
      .catch(() => setProducts(MOCK))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadProducts() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      await adminDeleteProduct(id)
      setProducts((p) => p.filter((x) => x.id !== id))
    } catch {
      alert('Failed to delete product.')
    }
  }

  const openAdd = () => { setEditProduct(null); setFormOpen(true) }
  const openEdit = (product: Product) => { setEditProduct(product); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setEditProduct(null) }
  const handleSaved = () => { closeForm(); loadProducts() }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    {
      key: 'image',
      header: 'Image',
      render: (row: Product) => (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden">
          <Image src={row.image} alt={row.name} fill className="object-cover" />
        </div>
      ),
    },
    { key: 'name', header: 'Name' },
    {
      key: 'category',
      header: 'Category',
      render: (row: Product) => row.category.name,
    },
    {
      key: 'basePrice',
      header: 'Price',
      render: (row: Product) => formatRupiah(row.basePrice),
    },
    { key: 'stock', header: 'Stock' },
    {
      key: 'isAvailable',
      header: 'Status',
      render: (row: Product) => (
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            row.isAvailable ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-red-50 text-red-600'
          }`}
        >
          {row.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Product) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT hover:text-green-DEFAULT transition-colors">
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
          <h1 className="font-heading text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted mt-1">Manage your menu items</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.35)] transition-all"
          style={{ boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}>
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4 mb-4">
        <div className="relative max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
          />
        </div>
      </div>

      <DataTable columns={columns as never} data={filtered as never} loading={loading} />

      {formOpen && (
        <ProductForm
          product={editProduct}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
