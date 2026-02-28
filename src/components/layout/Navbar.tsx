'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingCart, LogIn, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <Link
        href={href}
        style={{ color: hovered ? '#16a34a' : '#6b7280', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </Link>
    </li>
  )
}

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

  const isMenuPage = pathname.startsWith('/menu')
  const links = isMenuPage ? [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Bundles', href: '/#bundles' },
    { label: 'Contact', href: '/#contact' },
  ] : [
    { label: 'Menu', href: '#menu' },
    { label: 'Bundles', href: '#bundles' },
    { label: 'How It Works', href: '#how' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      id="main-nav"
      className={cn(
        'z-50 flex items-center justify-between px-16 py-4',
        'bg-white/[.92] backdrop-blur-[16px] transition-all duration-300',
        isHome
          ? 'fixed top-0 left-0 right-0'
          : 'sticky top-0',
        isHome
          ? scrolled ? 'border-b border-[#e5e7eb] shadow-sm scrolled' : 'border-b border-transparent'
          : 'border-b border-[#e5e7eb]'
      )}
    >
      {/* Logo */}
      <Link href="/" className="font-heading text-[22px] font-bold">
        <span style={{ color: '#16a34a' }}>Greens </span>
        <span style={{ color: '#111827' }}>&amp;</span>
        <span style={{ color: '#16a34a' }}> Co.</span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-8 list-none items-center">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
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
            <div style={{ position: 'absolute', top: -5, right: -5, width: 18, height: 18, background: '#16a34a', color: '#ffffff', borderRadius: '50%', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', lineHeight: 1 }}>
              {totalItems}
            </div>
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
            <Link href="/auth/login">
              <button
                style={{ padding: '10px 22px', background: '#16a34a', color: 'white', border: 'none', borderRadius: 100, fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <LogIn size={14} />
                Login
              </button>
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
            {links.map((link) => (
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
              <Link
                href="/auth/login"
                className="text-center py-2.5 border border-[#e5e7eb] rounded-full text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
