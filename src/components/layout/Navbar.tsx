'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Zap, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Bundles', href: '/menu?cat=bundle' },
    { label: 'How It Works', href: '/#how' },
    { label: 'Contact', href: '/#contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/menu') return pathname === '/menu' || pathname.startsWith('/menu/')
    return pathname === href
  }

  return (
    <nav
      className={cn(
        'z-50 flex items-center justify-between px-16 py-4',
        'bg-white/[.92] backdrop-blur-md transition-all duration-300',
        isHome
          ? 'fixed top-0 left-0 right-0'
          : 'sticky top-0',
        isHome
          ? scrolled ? 'border-b border-[#e5e7eb] shadow-sm' : 'border-b border-transparent'
          : 'border-b border-[#e5e7eb]'
      )}
    >
      {/* Logo */}
      <Link href="/" className="font-heading text-[22px] font-bold text-green-DEFAULT">
        Greens <span className="text-[#111827]">&</span> Co.
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-8 list-none items-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-green-DEFAULT font-semibold'
                  : 'text-muted hover:text-green-DEFAULT'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-2.5">
        {/* Cart */}
        <button
          onClick={openCart}
          className="relative w-10 h-10 rounded-[10px] border border-[#e5e7eb] bg-white flex items-center justify-center text-muted hover:border-green-DEFAULT hover:text-green-DEFAULT transition-all"
          aria-label="Open cart"
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-green-DEFAULT text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>

        {/* Auth / Order now */}
        {user ? (
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted font-medium">{user.name}</span>
            <button
              onClick={logout}
              className="text-sm font-medium text-muted hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted hover:text-green-DEFAULT transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/menu"
              className="flex items-center gap-1.5 px-[22px] py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold font-body hover:bg-green-dark hover:-translate-y-px transition-all"
            >
              <Zap size={14} />
              Order Now
            </Link>
          </div>
        )}

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#e5e7eb] shadow-lg md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#111827] hover:text-green-DEFAULT transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[#e5e7eb]" />
            {user ? (
              <button
                onClick={() => { logout(); setMobileOpen(false) }}
                className="text-sm font-medium text-red-500 text-left"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/login"
                  className="flex-1 text-center py-2.5 border border-[#e5e7eb] rounded-full text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/menu"
                  className="flex-1 text-center py-2.5 bg-green-DEFAULT text-white rounded-full text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-green-dark hover:-translate-y-px transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <Zap size={14} />
                  Order Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
