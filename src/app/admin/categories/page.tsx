'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import DataTable from '@/components/admin/DataTable'
import CategoryForm from '@/components/admin/CategoryForm'
import { Category } from '@/types'
import { adminGetCategories, adminDeleteCategory } from '@/lib/api'

const MOCK: Category[] = [
  { id: '1', name: 'Salad', slug: 'salad' },
  { id: '2', name: 'Rice Bowl', slug: 'rice-bowl' },
  { id: '3', name: 'Drinks', slug: 'drinks' },
  { id: '4', name: 'Snack', slug: 'snack' },
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | null>(null)

  const loadCategories = () => {
    adminGetCategories()
      .then((res) => setCategories(res.data.data ?? res.data))
      .catch(() => setCategories(MOCK))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadCategories() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return
    try {
      await adminDeleteCategory(id)
      setCategories((c) => c.filter((x) => x.id !== id))
    } catch {
      alert('Failed to delete category.')
    }
  }

  const openAdd = () => { setEditCategory(null); setFormOpen(true) }
  const openEdit = (cat: Category) => { setEditCategory(cat); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setEditCategory(null) }
  const handleSaved = () => { closeForm(); loadCategories() }

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'slug', header: 'Slug' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Category) => (
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
          <h1 className="font-heading text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted mt-1">Manage product categories</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark transition-colors">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <DataTable columns={columns as never} data={categories as never} loading={loading} />

      {formOpen && (
        <CategoryForm
          category={editCategory}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}

