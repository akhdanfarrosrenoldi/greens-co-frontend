'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Plus, Trash2, Loader2, ImageIcon } from 'lucide-react'
import { Product, Category } from '@/types'
import { adminCreateProduct, adminUpdateProduct, getCategories } from '@/lib/api'

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
  onSaved: () => void
}

interface FormState {
  name: string
  slug: string
  description: string
  basePrice: string
  stock: string
  image: string
  categoryId: string
  isAvailable: boolean
  variants: { id: string; name: string; additionalPrice: string }[]
}

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Salad', slug: 'salad' },
  { id: '2', name: 'Rice Bowl', slug: 'rice-bowl' },
  { id: '3', name: 'Drinks', slug: 'drinks' },
  { id: '4', name: 'Snack', slug: 'snack' },
]

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

export default function ProductForm({ product, onClose, onSaved }: ProductFormProps) {
  const isEdit = !!product
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    basePrice: product?.basePrice ? String(product.basePrice) : '',
    stock: product?.stock ? String(product.stock) : '',
    image: product?.image ?? '',
    categoryId: product?.category?.id ?? '',
    isAvailable: product?.isAvailable ?? true,
    variants: product?.variants?.map((v) => ({
      id: v.id,
      name: v.name,
      additionalPrice: String(v.additionalPrice),
    })) ?? [],
  })

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.data ?? res.data))
      .catch(() => setCategories(MOCK_CATEGORIES))
  }, [])

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({
      ...f,
      [key]: value,
      ...(key === 'name' && !isEdit ? { slug: slugify(value as string) } : {}),
    }))
  }

  const addVariant = () =>
    setForm((f) => ({
      ...f,
      variants: [...f.variants, { id: `new-${Date.now()}`, name: '', additionalPrice: '0' }],
    }))

  const updateVariant = (i: number, key: 'name' | 'additionalPrice', val: string) =>
    setForm((f) => {
      const v = [...f.variants]
      v[i] = { ...v[i], [key]: val }
      return { ...f, variants: v }
    })

  const removeVariant = (i: number) =>
    setForm((f) => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.basePrice || !form.categoryId || !form.image) {
      return setError('Please fill in all required fields.')
    }
    setError('')
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        description: form.description,
        basePrice: Number(form.basePrice),
        stock: Number(form.stock) || 0,
        image: form.image,
        categoryId: form.categoryId,
        isAvailable: form.isAvailable,
        variants: form.variants.map((v) => ({
          id: v.id.startsWith('new-') ? undefined : v.id,
          name: v.name,
          additionalPrice: Number(v.additionalPrice) || 0,
        })),
      }
      if (isEdit && product) {
        await adminUpdateProduct(product.id, payload)
      } else {
        await adminCreateProduct(payload)
      }
      onSaved()
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 text-sm border border-[#e5e7eb] rounded-xl bg-white focus:outline-none focus:border-green-DEFAULT transition-colors'
  const labelClass = 'block text-xs font-semibold text-muted mb-1.5'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl animate-[slide-in-right_0.25s_ease]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
          <h2 className="font-heading text-xl font-bold">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form
          id="product-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
        >
          {/* Image preview + URL */}
          <div>
            <label className={labelClass}>
              Image URL <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center shrink-0">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="preview"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <ImageIcon size={24} className="text-muted-light" />
                )}
              </div>
              <input
                value={form.image}
                onChange={(e) => setField('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={`${inputClass} flex-1`}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className={labelClass}>
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="e.g. Garden Fresh Salad"
              className={inputClass}
            />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input
              value={form.slug}
              onChange={(e) => setField('slug', slugify(e.target.value))}
              placeholder="garden-fresh-salad"
              className={`${inputClass} font-mono text-xs`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              rows={3}
              placeholder="Describe the product..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Price + Stock row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Base Price (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.basePrice}
                onChange={(e) => setField('basePrice', e.target.value)}
                placeholder="35000"
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setField('stock', e.target.value)}
                placeholder="10"
                min="0"
                className={inputClass}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => setField('categoryId', e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-[#e5e7eb]">
            <div>
              <p className="text-sm font-medium text-[#111827]">Available</p>
              <p className="text-xs text-muted mt-0.5">Show this product to customers</p>
            </div>
            <button
              type="button"
              onClick={() => setField('isAvailable', !form.isAvailable)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                form.isAvailable ? 'bg-green-DEFAULT' : 'bg-[#e5e7eb]'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.isAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`${labelClass} mb-0`}>Variants (optional)</label>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-1 text-xs font-semibold text-green-DEFAULT hover:text-green-dark transition-colors"
              >
                <Plus size={13} />
                Add Variant
              </button>
            </div>
            {form.variants.length === 0 ? (
              <p className="text-xs text-muted py-2">No variants. Product uses base price only.</p>
            ) : (
              <div className="space-y-2">
                {form.variants.map((v, i) => (
                  <div key={v.id} className="flex items-center gap-2">
                    <input
                      value={v.name}
                      onChange={(e) => updateVariant(i, 'name', e.target.value)}
                      placeholder="Variant name (e.g. Large)"
                      className={`${inputClass} flex-1`}
                    />
                    <input
                      type="number"
                      value={v.additionalPrice}
                      onChange={(e) => updateVariant(i, 'additionalPrice', e.target.value)}
                      placeholder="+price"
                      min="0"
                      className={`${inputClass} w-24`}
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="w-9 h-9 shrink-0 rounded-lg border border-[#e5e7eb] flex items-center justify-center text-muted hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-[#e5e7eb] rounded-full text-sm font-medium hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark transition-all disabled:opacity-60"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </>
  )
}
