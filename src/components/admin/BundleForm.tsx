'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Loader2, Plus, Trash2 } from 'lucide-react'
import { Bundle } from '@/types'
import { adminCreateBundle, adminUpdateBundle } from '@/lib/api'
import { slugify } from '@/lib/utils'

interface BundleFormProps {
  bundle: Bundle | null
  onClose: () => void
  onSaved: () => void
}

export default function BundleForm({ bundle, onClose, onSaved }: BundleFormProps) {
  const [name, setName] = useState(bundle?.name ?? '')
  const [slug, setSlug] = useState(bundle?.slug ?? '')
  const [description, setDescription] = useState(bundle?.description ?? '')
  const [price, setPrice] = useState(bundle?.price?.toString() ?? '')
  const [originalPrice, setOriginalPrice] = useState(bundle?.originalPrice?.toString() ?? '')
  const [image, setImage] = useState(bundle?.image ?? '')
  const [isPopular, setIsPopular] = useState(bundle?.isPopular ?? false)
  const [items, setItems] = useState<{ name: string; qty: number }[]>(
    bundle?.items?.map((i) => ({ name: i.product?.name ?? '', qty: i.qty })) ?? []
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!bundle) setSlug(slugify(name))
  }, [name, bundle])

  const addItem = () => setItems((prev) => [...prev, { name: '', qty: 1 }])
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx))
  const updateItem = (idx: number, field: 'name' | 'qty', value: string | number) =>
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setError('Bundle name is required.')
    if (!price) return setError('Price is required.')
    setError('')
    setLoading(true)
    try {
      const payload = {
        name, slug, description,
        price: Number(price),
        originalPrice: Number(originalPrice),
        image, isPopular, items,
      }
      if (bundle) {
        await adminUpdateBundle(bundle.id, payload)
      } else {
        await adminCreateBundle(payload)
      }
      onSaved()
    } catch {
      setError('Failed to save bundle.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <h2 className="font-heading text-xl font-bold">
            {bundle ? 'Edit Bundle' : 'Add Bundle'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="bundle-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Image preview */}
            {image && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#e5e7eb]">
                <Image src={image} alt="Bundle preview" fill className="object-cover" />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                Image URL
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  Bundle Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Healthy Starter"
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
                  placeholder="healthy-starter"
                  className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Short description..."
                className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  Price (Rp)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="79000"
                  className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  Original Price (Rp)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="95000"
                  className="w-full px-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors"
                />
              </div>
            </div>

            {/* Popular toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPopular(!isPopular)}
                className={`relative w-10 h-6 rounded-full transition-colors ${isPopular ? 'bg-green-DEFAULT' : 'bg-[#d1d5db]'}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${isPopular ? 'left-5' : 'left-1'}`}
                />
              </button>
              <label className="text-sm font-medium text-[#111827]">Mark as Popular</label>
            </div>

            {/* Bundle Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Bundle Items
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1 text-xs text-green-DEFAULT font-medium hover:underline"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>
              {items.length === 0 ? (
                <p className="text-xs text-muted italic py-2">No items added yet.</p>
              ) : (
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        value={item.name}
                        onChange={(e) => updateItem(idx, 'name', e.target.value)}
                        placeholder="Product name"
                        className="flex-1 px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-green-DEFAULT transition-colors"
                      />
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => updateItem(idx, 'qty', Number(e.target.value))}
                        className="w-16 px-3 py-2 text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-green-DEFAULT transition-colors text-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="w-9 h-9 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                {error}
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border border-[#e5e7eb] rounded-full text-sm font-semibold text-[#111827] hover:border-[#9ca3af] transition-colors"
          >
            Cancel
          </button>
          <button
            form="bundle-form"
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.35)] transition-all disabled:opacity-60"
            style={{ boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Save Bundle
          </button>
        </div>
      </div>
    </div>
  )
}
