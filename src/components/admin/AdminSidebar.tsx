'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Layers,
  Tag,
  ShoppingBag,
  Package,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', href: '/admin/products', icon: Package, exact: false },
  { label: 'Categories', href: '/admin/categories', icon: Tag, exact: false },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, exact: false },
  { label: 'Bundles', href: '/admin/bundles', icon: Layers, exact: false },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-[#e5e7eb] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 h-16 border-b border-[#e5e7eb] flex items-center gap-2.5">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-heading text-lg font-bold text-green-DEFAULT">Greens & Co.</span>
          <span className="text-[10px] font-bold bg-[#dcfce7] text-[#15803d] px-1.5 py-0.5 rounded-full leading-none">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors rounded-xl',
                active
                  ? 'bg-[#f0fdf4] text-[#15803d]'
                  : 'text-muted hover:bg-[#f9fafb] hover:text-[#111827]'
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#e5e7eb]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#f9fafb] mb-2">
          <div className="w-8 h-8 rounded-full bg-green-DEFAULT flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">{user?.name ?? 'Admin'}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  )
}
