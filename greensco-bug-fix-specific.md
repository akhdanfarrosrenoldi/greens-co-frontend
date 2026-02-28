# Greens & Co. — SPECIFIC BUG FIX PROMPT
# Fix ONLY issues listed below. Do not refactor or rewrite other code.

---

## BUG LIST & FIXES

---

### BUG 1: Warna teks putih hilang di Hero section

Semua teks berikut harus PUTIH atau sesuai warna dari HTML asli:

```tsx
// src/components/sections/Hero.tsx

// Hero tag (pill hijau muda):
// background: #dcfce7, color: #15803d, BUKAN hitam
<div className="hero-tag" style={{ 
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: '#dcfce7', color: '#15803d',
  padding: '6px 14px', borderRadius: 100,
  fontSize: 13, fontWeight: 600, marginBottom: 24
}}>
  <Leaf size={14} />
  Fresh & Healthy Food
</div>

// Hero title: color #111827 (text gelap), "Delivered" = #16a34a italic
// Hero desc: color #6b7280 (muted2)

// Stats — warna HARUS:
// stat-num: color #16a34a (green), font Playfair Display, 28px, bold
// stat-label: color #6b7280, 13px
<div style={{ display: 'flex', gap: 32, marginTop: 48 }} className="hero-stats">
  {[
    { num: '500+', label: 'Happy Customers' },
    { num: '30+',  label: 'Menu Items' },
    { num: '4.9★', label: 'Rating' },
  ].map(s => (
    <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#16a34a' }}>{s.num}</span>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</span>
    </div>
  ))}
</div>

// Floating cards — fc-icon:
// background: #dcfce7, color: #16a34a   ← BUKAN hitam
<div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Zap size={18} />
</div>
// fc-title: color #111827, 13px, font-weight 600
// fc-sub: color #6b7280, 11px
```

---

### BUG 2: USP Strip — teks dan icon harus PUTIH

```tsx
// src/components/sections/USPStrip.tsx
// Section: background #16a34a
// Semua teks dan icon: color WHITE (#ffffff)

<div style={{ background: '#16a34a', padding: '18px 64px', display: 'flex', justifyContent: 'center', gap: 64 }}>
  {[
    { icon: Truck,    label: 'Fast Delivery (30 min)' },
    { icon: Leaf,     label: 'Fresh Local Ingredients' },
    { icon: Heart,    label: 'Healthy & Nutritious' },
    { icon: Package,  label: 'Free Pickup Available' },
  ].map(({ icon: Icon, label }) => (
    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ffffff', fontSize: 14, fontWeight: 500 }}>
      <Icon size={16} color="#ffffff" />
      {label}
    </div>
  ))}
</div>
```

---

### BUG 3: "View All Menu" button — warna dan hover salah

```tsx
// src/components/sections/FeaturedMenu.tsx
// btn-link: color #16a34a, background none, border none
// hover: gap melebar 6px → 10px (arrow bergerak kanan)
// BUKAN hover warna berubah

const [hovered, setHovered] = useState(false)

<button
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  style={{
    color: '#16a34a',
    fontSize: 14, fontWeight: 600,
    background: 'none', border: 'none',
    display: 'flex', alignItems: 'center',
    gap: hovered ? 10 : 6,
    transition: 'gap 0.2s',
    cursor: 'pointer',
  }}
>
  View All Menu
  <ArrowRight size={14} />
</button>
```

---

### BUG 4: Button "Order Now" & button "+" di card — warna SELALU hijau, bukan hanya saat hover

```tsx
// MASALAH: background hijau hanya muncul saat cursor → ini berarti ada Tailwind class
// yang override, seperti bg-transparent atau bg-white sebagai default

// FIX — gunakan inline style, BUKAN Tailwind class untuk background:

// Button "Order Now" (hero):
<button style={{
  padding: '14px 28px',
  background: '#16a34a',          // ← inline style, selalu hijau
  color: '#ffffff',
  border: 'none',
  borderRadius: 100,
  fontSize: 15, fontWeight: 600,
  display: 'flex', alignItems: 'center', gap: 8,
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
  transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
}}>
  Order Now <ArrowRight size={16} />
</button>

// Button "+" di product card:
<button style={{
  width: 34, height: 34,
  background: '#16a34a',          // ← inline style, selalu hijau
  color: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s, transform 0.2s',
  flexShrink: 0,
}}>
  <Plus size={16} />
</button>

// HAPUS semua Tailwind class bg-* atau bg-transparent dari kedua button ini
// HAPUS class hover:bg-green-* — ganti dengan onMouseEnter/Leave jika perlu
```

---

### BUG 5: How It Works — step circle pertama & terakhir + warna teks

```tsx
// src/components/sections/HowItWorks.tsx

// Step pertama (index 0) dan terakhir (index 3): background HIJAU
// Step tengah (index 1, 2): background WHITE

const steps = [
  { icon: Utensils,    title: 'Browse Menu',   desc: 'Explore our fresh daily menu and pick your favorites' },
  { icon: ShoppingCart,title: 'Add to Cart',   desc: 'Select variants, quantities and any special notes' },
  { icon: CreditCard,  title: 'Checkout',      desc: 'Choose delivery or pickup, pay securely via Midtrans' },
  { icon: Smile,       title: 'Enjoy!',        desc: 'Your fresh meal arrives at your door in 30 minutes' },
]

{steps.map((step, i) => {
  const isHighlight = i === 0 || i === steps.length - 1
  return (
    <div key={i} className="step-item">
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: isHighlight ? '#16a34a' : 'white',
        border: `2px solid ${isHighlight ? '#16a34a' : '#bbf7d0'}`,
        color: isHighlight ? 'white' : '#6b7280',       // ← warna icon
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(22,163,74,0.1)',
        marginBottom: 20,
      }}>
        <step.icon size={22} />
      </div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
        {step.title}
      </div>
      <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
        {step.desc}
      </div>
    </div>
  )
})}
```

---

### BUG 6: Footer navigasi dobel — navbar links muncul 2x

```tsx
// src/components/layout/Footer.tsx
// MASALAH: nav links dari Navbar bocor ke Footer, atau Footer render nav links 2x

// Footer kolom "Menu" HANYA berisi:
const menuLinks = [
  { label: 'All Menu',    href: '/menu' },
  { label: 'Salads',      href: '/menu?cat=salad' },
  { label: 'Rice Bowls',  href: '/menu?cat=bowl' },
  { label: 'Drinks',      href: '/menu?cat=drinks' },
  { label: 'Bundles',     href: '#bundles' },
]

// Footer kolom "Info" HANYA berisi:
const infoLinks = [
  { label: 'About Us' },
  { label: 'How It Works' },
  { label: 'Delivery Area' },
  { label: 'FAQ' },
]

// Footer kolom "Contact":
const contactLinks = [
  { icon: MapPin,  label: 'Bandung, Indonesia' },
  { icon: Phone,   label: '+62 812-3456-7890' },
  { icon: Mail,    label: 'hello@greensco.id' },
  { icon: Clock,   label: '07:00 – 21:00 WIB' },
]

// PASTIKAN: Footer TIDAK import atau render komponen Navbar
// PASTIKAN: Navbar TIDAK render di dalam Footer
// Cek src/app/layout.tsx — Navbar dan Footer harus ada di sana, bukan di dalam satu sama lain
```

---

### BUG 7: Navbar — hapus "Order Now", ganti jadi "Login"

```tsx
// src/components/layout/Navbar.tsx

// HAPUS tombol "Order Now" (yang ada icon Zap)
// GANTI dengan tombol "Login" yang link ke /auth/login

import Link from 'next/link'

// Di nav-actions:
<Link href="/auth/login">
  <button style={{
    padding: '10px 22px',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: 100,
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14, fontWeight: 600,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6,
    transition: 'background 0.2s, transform 0.2s',
  }}
  onMouseEnter={e => { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.transform = 'translateY(-1px)' }}
  onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)' }}
  >
    <LogIn size={14} />
    Login
  </button>
</Link>

// Import tambahan: import { LogIn } from 'lucide-react'
```

---

### BUG 8: Navbar links — samain PERSIS dengan HTML asli

```tsx
// src/components/layout/Navbar.tsx
// HTML home page nav links:
const homeLinks = [
  { label: 'Menu',         href: '#menu' },
  { label: 'Bundles',      href: '#bundles' },
  { label: 'How It Works', href: '#how' },
  { label: 'Contact',      href: '#contact' },
]

// HTML menu page nav links:
const menuPageLinks = [
  { label: 'Home',    href: '/' },
  { label: 'Menu',    href: '/menu' },
  { label: 'Bundles', href: '/menu#bundles' },
  { label: 'Contact', href: '/#contact' },
]

// CARA IMPLEMENTASI — deteksi halaman dengan usePathname():
const pathname = usePathname()
const isMenuPage = pathname.startsWith('/menu')

const links = isMenuPage ? menuPageLinks : homeLinks

// Render:
<ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}>
  {links.map(link => (
    <li key={link.label}>
      <Link href={link.href} style={{
        fontSize: 14, fontWeight: 500,
        color: pathname === link.href ? '#16a34a' : '#6b7280',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#16a34a'}
      onMouseLeave={e => e.currentTarget.style.color = pathname === link.href ? '#16a34a' : '#6b7280'}
      >
        {link.label}
      </Link>
    </li>
  ))}
</ul>

// JANGAN render 2 set links — hanya 1 kondisional berdasarkan pathname
```

---

### BUG 9: Product card — harga & button warna

```tsx
// src/components/menu/ProductCard.tsx

// Harga: color #16a34a, font-size 17px, font-weight 700
// HARUS selalu hijau, bukan hitam/default

<span style={{ fontSize: 17, fontWeight: 700, color: '#16a34a' }}>
  {formatRupiah(product.price)}
</span>

// Button + HARUS selalu hijau (lihat BUG 4 di atas untuk fix inline style)
// Pastikan tidak ada Tailwind class yang override background
```

---

## CHECKLIST SETELAH FIX

Verifikasi visual tanpa hover dulu:
- [ ] Hero tag: pill hijau muda, teks hijau tua
- [ ] Hero stats: angka hijau (500+, 30+, 4.9★), label abu
- [ ] Floating card icons: background hijau muda, icon hijau
- [ ] USP strip: semua teks & icon PUTIH di atas background hijau
- [ ] "View All Menu": teks hijau, visible tanpa hover
- [ ] Button "Order Now" di hero: SELALU background hijau solid
- [ ] Button "+" di card: SELALU background hijau solid
- [ ] Step circle 1 & 4 (Browse + Enjoy): background hijau, icon putih
- [ ] Harga produk: selalu hijau
- [ ] Navbar: hanya 1 set link (bukan dobel)
- [ ] Navbar: tombol "Login" (bukan "Order Now")
- [ ] Footer: 4 kolom terpisah, tidak ada navbar links di dalamnya
