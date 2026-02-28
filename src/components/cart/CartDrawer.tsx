'use client'

import { X, ShoppingCart, Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { formatRupiah } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-[slide-in-right_0.3s_ease]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={20} className="text-green-DEFAULT" />
            <h2 className="font-heading text-lg font-bold">Your Cart</h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 bg-green-light text-green-dark rounded-full text-xs font-semibold">
                {items.length} item{items.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                <ShoppingCart size={32} className="text-green-DEFAULT" />
              </div>
              <div>
                <p className="font-heading text-lg font-semibold mb-1">Cart is empty</p>
                <p className="text-sm text-muted">Add some fresh items to get started!</p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold hover:bg-green-dark transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-3 p-3 rounded-xl border border-[#e5e7eb] bg-white"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/64x64/dcfce7/16a34a?text=Food'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#111827] truncate">{item.name}</p>
                    {item.variantName && (
                      <p className="text-xs text-muted mt-0.5">{item.variantName}</p>
                    )}
                    <p className="text-sm font-bold text-green-DEFAULT mt-1">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.variantId, item.qty - 1)
                        }
                        className="w-6 h-6 rounded-md border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT hover:text-green-DEFAULT transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.variantId, item.qty + 1)
                        }
                        className="w-6 h-6 rounded-md bg-green-DEFAULT text-white flex items-center justify-center hover:bg-green-dark transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#e5e7eb] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted font-medium">Subtotal</span>
              <span className="font-bold text-[#111827]">{formatRupiah(totalPrice)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark transition-all hover:-translate-y-px shadow-lg shadow-green-DEFAULT/30"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-sm text-muted hover:text-green-DEFAULT transition-colors"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
