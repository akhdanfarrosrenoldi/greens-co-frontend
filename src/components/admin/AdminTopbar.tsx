'use client'

import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Product Management',
  '/admin/categories': 'Categories',
  '/admin/orders': 'Orders',
  '/admin/bundles': 'Bundles',
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Match longest prefix
  const title =
    Object.entries(PAGE_TITLES)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin'

  return (
    <div className="h-16 shrink-0 border-b border-[#e5e7eb] bg-white flex items-center justify-between px-8">
      <h2 className="font-semibold text-[#111827]">{title}</h2>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl border border-[#e5e7eb] flex items-center justify-center hover:border-green-DEFAULT hover:text-green-DEFAULT transition-colors">
          <Bell size={16} className="text-muted" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-green-DEFAULT flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <span className="text-sm font-medium text-[#111827] hidden sm:block">
            {user?.name ?? 'Admin'}
          </span>
        </div>
      </div>
    </div>
  )
}
