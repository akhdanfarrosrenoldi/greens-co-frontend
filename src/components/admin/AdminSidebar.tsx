'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  ShoppingBag,
  Package,
  LogOut,
  Leaf,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', href: '/admin/products', icon: UtensilsCrossed, exact: false },
  { label: 'Categories', href: '/admin/categories', icon: Tag, exact: false },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, exact: false },
  { label: 'Bundles', href: '/admin/bundles', icon: Package, exact: false },
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
    <aside className="w-64 shrink-0 bg-[#111827] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#1f2937]">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-heading text-xl font-bold text-green-DEFAULT"
        >
          <Leaf size={20} />
          Greens & Co.
        </Link>
        <p className="text-xs text-[#6b7280] mt-1">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-green-DEFAULT text-white'
                  : 'text-[#9ca3af] hover:bg-[#1f2937] hover:text-white'
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#1f2937]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1f2937] mb-2">
          <div className="w-8 h-8 rounded-full bg-green-DEFAULT flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name ?? 'Admin'}</p>
            <p className="text-xs text-[#6b7280] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#9ca3af] hover:text-red-400 transition-colors rounded-lg hover:bg-[#1f2937]"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  )
}
