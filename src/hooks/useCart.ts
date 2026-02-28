'use client'

import useCartStore from '@/store/cart'
import { CartItem } from '@/types'

export function useCart() {
  const store = useCartStore()

  const addToCart = (item: CartItem) => {
    store.addItem(item)
    store.openCart()
  }

  return {
    items: store.items,
    isOpen: store.isOpen,
    totalItems: store.totalItems(),
    totalPrice: store.totalPrice(),
    addToCart,
    removeItem: store.removeItem,
    updateQty: store.updateQty,
    clearCart: store.clearCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
  }
}
