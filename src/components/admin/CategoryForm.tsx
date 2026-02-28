'use client'

import { useEffect, useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Category } from '@/types'
import { adminCreateCategory, adminUpdateCategory } from '@/lib/api'
import { slugify } from '@/lib/utils'

interface CategoryFormProps {
  category: Category | null
  onClose: () => void
  onSaved: () => void
}

export default function CategoryForm({ category, onClose, onSaved }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [slug, setSlug] = useState(category?.slug ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!category) setSlug(slugify(name))
  }, [name, category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setError('Category name is required.')
    setError('')
    setLoading(true)
    try {
      if (category) {
        await adminUpdateCategory(category.id, { name, slug })
      } else {
        await adminCreateCategory({ name, slug })
      }
      onSaved()
    } catch {
      setError('Failed to save category.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold">
            {category ? 'Edit Category' : 'Add Category'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Salad"
              className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. salad"
              className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors font-mono"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#e5e7eb] rounded-full text-sm font-semibold text-[#111827] hover:border-[#9ca3af] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark transition-colors disabled:opacity-60"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
