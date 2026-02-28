# Greens & Co. — TARGETED COLOR & NAV FIX
# Fix ONLY these specific remaining bugs. Edit files in-place.

---

## BUG 1: Cart badge warna — notifikasi di atas keranjang

```tsx
// src/components/layout/Navbar.tsx
// Badge harus: background #16a34a, color white, border 2px solid white

// HAPUS semua Tailwind class bg-* dari badge
// PAKAI inline style:
<div style={{
  position: 'absolute',
  top: -5, right: -5,
  width: 18, height: 18,
  background: '#16a34a',      // ← inline, bukan Tailwind
  color: '#ffffff',
  borderRadius: '50%',
  fontSize: 10, fontWeight: 700,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '2px solid white',
  lineHeight: 1,
}}>
  {totalItems}
</div>
```

---

## BUG 2: Badge "Best Seller" & "New" di Featured Menu cards

```tsx
// src/components/sections/FeaturedMenu.tsx
// Badge harus selalu tampil (bukan hanya hover)
// Warna:
// "Best Seller" → background #16a34a, color white
// "New"         → background #f59e0b, color white

// PAKAI inline style, HAPUS Tailwind bg-* class:
{product.badge === 'bestseller' && (
  <div style={{
    position: 'absolute', top: 12, left: 12,
    background: '#16a34a',
    color: 'white',
    fontSize: 11, fontWeight: 600,
    padding: '3px 10px', borderRadius: 100,
  }}>
    Best Seller
  </div>
)}
{product.badge === 'new' && (
  <div style={{
    position: 'absolute', top: 12, left: 12,
    background: '#f59e0b',
    color: 'white',
    fontSize: 11, fontWeight: 600,
    padding: '3px 10px', borderRadius: 100,
  }}>
    New
  </div>
)}
```

---

## BUG 3: Category label "Salad", "Rice Bowl" di card — warna harus hijau

```tsx
// src/components/sections/FeaturedMenu.tsx
// src/components/menu/ProductCard.tsx
// Category label: color #16a34a, bukan hitam/abu

<div style={{
  fontSize: 11,
  color: '#16a34a',             // ← hijau
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 1,
  marginBottom: 6,
}}>
  {product.category}
</div>
```

---

## BUG 4: Bundle — "Order Bundle" button & harga warna salah

```tsx
// src/components/sections/BundleSection.tsx

// Harga bundle (bundle-price-main):
<div style={{ fontSize: 20, fontWeight: 700, color: '#16a34a' }}>
  Rp 79.000
</div>

// Harga coret (bundle-price-save):
<div style={{ fontSize: 12, color: '#6b7280' }}>
  <s style={{ marginRight: 4 }}>Rp 95.000</s> Save 16%
</div>

// Button "Order Bundle" — SELALU hijau, bukan hanya hover:
<button style={{
  padding: '10px 20px',
  background: '#16a34a',        // ← inline style, selalu hijau
  color: '#ffffff',
  border: 'none',
  borderRadius: 100,
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 13, fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.2s, transform 0.2s',
  whiteSpace: 'nowrap',
}}
onMouseEnter={e => {
  e.currentTarget.style.background = '#15803d'
  e.currentTarget.style.transform = 'translateY(-1px)'
}}
onMouseLeave={e => {
  e.currentTarget.style.background = '#16a34a'
  e.currentTarget.style.transform = 'translateY(0)'
}}
>
  Order Bundle
</button>
```

---

## BUG 5: Footer links — samakan PERSIS dengan HTML asli

Dari HTML `home-v2.html`, footer kolom adalah:

```tsx
// src/components/layout/Footer.tsx
// REPLACE seluruh isi footer links dengan ini:

// Kolom 1: Brand
// Logo "Greens & Co." + tagline + social icons (Instagram, Twitter, Facebook)

// Kolom 2: Menu
const menuLinks = [
  { label: 'All Menu',    href: '/menu' },
  { label: 'Salads',      href: '/menu?cat=salad' },
  { label: 'Rice Bowls',  href: '/menu?cat=bowl' },
  { label: 'Drinks',      href: '/menu?cat=drinks' },
  { label: 'Bundles',     href: '/#bundles' },
]

// Kolom 3: Info
const infoLinks = [
  { label: 'About Us' },
  { label: 'How It Works' },
  { label: 'Delivery Area' },
  { label: 'FAQ' },
]

// Kolom 4: Contact
const contactLinks = [
  { icon: MapPin,  label: 'Bandung, Indonesia' },
  { icon: Phone,   label: '+62 812-3456-7890' },
  { icon: Mail,    label: 'hello@greensco.id' },
  { icon: Clock,   label: '07:00 – 21:00 WIB' },
]

// Setiap link: icon ChevronRight size 12 di depan (kecuali contact pakai icon sendiri)
// color: #d1d5db, hover: #16a34a
// TIDAK ADA link navbar (Menu, Bundles, How It Works, Contact) di footer
// Footer dan Navbar adalah komponen TERPISAH, tidak saling import

// Grid footer: grid-template-columns: 2fr 1fr 1fr 1fr, gap 48px
// background: #111827
```

---

## BUG 6: Navbar links — samakan PERSIS dengan HTML asli

```tsx
// src/components/layout/Navbar.tsx

// HTML home-v2.html navbar links (untuk halaman "/" ):
// Menu → #menu
// Bundles → #bundles  
// How It Works → #how
// Contact → #contact

// HTML menu.html navbar links (untuk halaman "/menu"):
// Home → /
// Menu → /menu  (active)
// Bundles → /menu (atau href="#")
// Contact → /#contact

// Implementasi:
const pathname = usePathname()

const navLinks = pathname.startsWith('/menu')
  ? [
      { label: 'Home',    href: '/' },
      { label: 'Menu',    href: '/menu' },
      { label: 'Bundles', href: '/#bundles' },
      { label: 'Contact', href: '/#contact' },
    ]
  : [
      { label: 'Menu',         href: '#menu' },
      { label: 'Bundles',      href: '#bundles' },
      { label: 'How It Works', href: '#how' },
      { label: 'Contact',      href: '#contact' },
    ]

// RENDER HANYA SATU ul dengan map dari navLinks
// Tidak boleh ada 2 ul atau 2 list nav links
// Pastikan tidak ada komponen lain yang inject nav links tambahan
```

---

## CHECKLIST SETELAH FIX

- [ ] Cart badge: selalu hijau solid (#16a34a) dengan border putih
- [ ] Badge "Best Seller": selalu hijau (#16a34a), tidak hilang saat tidak hover
- [ ] Badge "New": selalu amber (#f59e0b), tidak hilang saat tidak hover
- [ ] Label "Salad", "Rice Bowl" di card: hijau (#16a34a)
- [ ] Bundle price: hijau (#16a34a)
- [ ] "Order Bundle" button: selalu hijau solid (tidak hanya saat hover)
- [ ] Footer: 4 kolom — Brand, Menu (5 link), Info (4 link), Contact (4 link)
- [ ] Footer: tidak ada link "How It Works" atau "Contact" di kolom pertama
- [ ] Navbar home: Menu · Bundles · How It Works · Contact
- [ ] Navbar menu page: Home · Menu · Bundles · Contact
- [ ] Navbar: hanya 1 set link, tidak dobel
