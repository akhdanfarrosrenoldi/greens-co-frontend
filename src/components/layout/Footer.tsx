import Link from 'next/link'
import { Instagram, Twitter, Facebook, ChevronRight, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111827] text-white px-16 py-16">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="font-heading text-2xl font-bold text-green-DEFAULT mb-3">
            Greens & Co.
          </div>
          <p className="text-sm text-[#9ca3af] leading-relaxed mb-6 max-w-xs">
            Fresh, healthy food delivered to your door. Made with love from locally
            sourced ingredients every single day.
          </p>
          <div className="flex gap-2.5">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-lg bg-[#1f2937] border border-[#374151] flex items-center justify-center text-[#9ca3af] hover:bg-green-DEFAULT hover:text-white hover:border-green-DEFAULT transition-all"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div>
          <div className="text-xs font-semibold tracking-[1px] uppercase text-[#9ca3af] mb-4">
            Menu
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'All Menu',   href: '/menu' },
              { label: 'Salads',     href: '/menu?cat=salad' },
              { label: 'Rice Bowls', href: '/menu?cat=bowl' },
              { label: 'Drinks',     href: '/menu?cat=drinks' },
              { label: 'Bundles',    href: '/#bundles' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-[#d1d5db] hover:text-green-DEFAULT transition-colors flex items-center gap-2"
              >
                <ChevronRight size={12} />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs font-semibold tracking-[1px] uppercase text-[#9ca3af] mb-4">
            Info
          </div>
          <div className="flex flex-col gap-2.5">
            {['About Us', 'How It Works', 'Delivery Area', 'FAQ'].map((item) => (
              <Link
                key={item}
                href="/#how"
                className="text-sm text-[#d1d5db] hover:text-green-DEFAULT transition-colors flex items-center gap-2"
              >
                <ChevronRight size={12} />
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs font-semibold tracking-[1px] uppercase text-[#9ca3af] mb-4">
            Contact
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: MapPin, text: 'Bandung, Indonesia' },
              { icon: Phone, text: '+62 812-3456-7890' },
              { icon: Mail, text: 'hello@greensco.id' },
              { icon: Clock, text: '07:00 – 21:00 WIB' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="text-sm text-[#d1d5db] flex items-center gap-2">
                <Icon size={12} className="text-[#9ca3af] shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#1f2937] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <span className="text-sm text-[#6b7280]">
          © 2026 Greens &amp; Co. All rights reserved.
        </span>
        <span className="text-sm text-[#6b7280]">
          Made with love in Bandung
        </span>
      </div>
    </footer>
  )
}
