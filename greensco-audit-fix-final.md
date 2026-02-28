# Greens & Co. — AUDIT & PRECISION FIX PROMPT
# Berdasarkan struktur file yang sudah ada. JANGAN buat file baru kecuali disebutkan.
# JANGAN hapus file apapun. Hanya EDIT file yang sudah ada.

---

## STATUS STRUKTUR (sudah benar, tidak perlu diubah)
```
Semua file sudah ada di posisi yang tepat:
✅ src/app/globals.css
✅ src/app/layout.tsx
✅ src/app/page.tsx
✅ src/components/layout/Navbar.tsx
✅ src/components/layout/Footer.tsx
✅ src/components/sections/Hero.tsx
✅ src/components/sections/USPStrip.tsx
✅ src/components/sections/FeaturedMenu.tsx
✅ src/components/sections/BundleSection.tsx
✅ src/components/sections/HowItWorks.tsx
✅ src/components/menu/CategoryTabs.tsx
✅ src/components/menu/FilterSidebar.tsx
✅ src/components/menu/ProductCard.tsx
✅ src/components/menu/ProductGrid.tsx
✅ src/components/cart/CartDrawer.tsx
✅ src/components/ui/EmptyState.tsx
✅ src/components/ui/StatusBadge.tsx
✅ src/hooks/useScrollReveal.ts
✅ src/store/cart.ts

TIDAK ADA file yang perlu dibuat baru.
TIDAK ADA file yang perlu dihapus.
```

---

## INSTRUKSI KERJA

Untuk setiap file di bawah:
1. **Baca file yang ada** dulu
2. **Bandingkan** dengan spec di bawah
3. **Edit hanya bagian yang tidak match** — jangan tulis ulang keseluruhan file
4. Urutan prioritas: globals.css → Navbar → Hero → sections → menu components

---

## FIX 1: `src/app/globals.css`

Pastikan file ini mengandung SEMUA hal berikut. Tambahkan yang belum ada, jangan hapus yang sudah ada:

```css
/* ── DESIGN TOKENS ── */
:root {
  --green: #16a34a;
  --green-dark: #15803d;
  --green-light: #dcfce7;
  --green-mid: #bbf7d0;
  --bg: #ffffff;
  --surface: #f9fafb;
  --surface2: #f0fdf4;
  --border: #e5e7eb;
  --text: #111827;
  --muted: #9ca3af;
  --muted2: #6b7280;
}

/* ── BASE ── */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: #ffffff;
  color: #111827;
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

/* ── KEYFRAMES (wajib ada semua 3 ini) ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

/* ── HERO ANIMATIONS (pakai CSS animation, bukan Framer Motion) ── */
.hero-tag    { opacity: 0; animation: fadeUp   0.6s ease 0.1s forwards; }
.hero-title  { opacity: 0; animation: fadeUp   0.6s ease 0.3s forwards; }
.hero-desc   { opacity: 0; animation: fadeUp   0.6s ease 0.5s forwards; }
.hero-cta    { opacity: 0; animation: fadeUp   0.6s ease 0.7s forwards; }
.hero-stats  { opacity: 0; animation: fadeUp   0.6s ease 0.9s forwards; }
.hero-visual { opacity: 0; animation: fadeLeft 0.8s ease 0.4s forwards; }
.card-1      { animation: float 3s ease-in-out infinite; }
.card-2      { animation: float 3s ease-in-out 1.5s infinite; }

/* ── SCROLL REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── HOW IT WORKS DASHED CONNECTOR ── */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  position: relative;
}
.steps-grid::before {
  content: '';
  position: absolute;
  top: 28px;
  left: 12%; right: 12%;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    #bbf7d0 0, #bbf7d0 8px,
    transparent 8px, transparent 16px
  );
  z-index: 0;
}
.step-item {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ── HERO DECORATIVE CIRCLE ── */
.hero-section {
  position: relative;
  overflow: hidden;
}
.hero-section::before {
  content: '';
  position: absolute;
  top: -150px; right: -150px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* ── NAVBAR SCROLLED STATE ── */
nav.scrolled {
  border-color: #e5e7eb !important;
  box-shadow: 0 1px 16px rgba(0,0,0,0.06) !important;
}

/* ── CATEGORY TABS ── */
.cat-tab {
  padding: 14px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  border: none;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cat-tab:hover { color: #111827; }
.cat-tab.active {
  color: #16a34a;
  border-bottom-color: #16a34a;
  font-weight: 600;
}
.cat-count {
  background: #f9fafb;
  color: #6b7280;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 100px;
}
.cat-tab.active .cat-count {
  background: #dcfce7;
  color: #15803d;
}

/* ── CUSTOM CHECKBOX ── */
.check-box {
  width: 18px; height: 18px;
  border-radius: 5px;
  border: 2px solid #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.2s, background 0.2s;
  flex-shrink: 0;
  cursor: pointer;
}
.check-item:hover .check-box { border-color: #16a34a; }
.check-item.checked .check-box {
  background: #16a34a;
  border-color: #16a34a;
  color: white;
}
```

---

## FIX 2: `src/components/layout/Navbar.tsx`

### Logo — struktur WAJIB 3 bagian:
```tsx
// BENAR:
<span className="font-heading text-[22px] font-bold">
  <span style={{ color: '#16a34a' }}>Greens </span>
  <span style={{ color: '#111827' }}>&amp;</span>
  <span style={{ color: '#16a34a' }}> Co.</span>
</span>

// SALAH (jangan):
// ❌ semua hijau
// ❌ "Greens" hijau + "& Co." hitam (hanya 2 bagian)
// ❌ menggunakan className text-green untuk seluruh logo
```

### Nav links styling:
```tsx
// color default: #6b7280 (muted2)
// hover: #16a34a
// active (usePathname match): #16a34a
// TIDAK ada underline, background, atau border

// Active detection:
const pathname = usePathname()
// link "/menu" active jika pathname === '/menu' atau pathname.startsWith('/menu')
// link "/" active jika pathname === '/'
```

### Scroll effect:
```tsx
// Pasang di useEffect:
const handleScroll = () => {
  const nav = document.getElementById('main-nav')
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20)
}
window.addEventListener('scroll', handleScroll)

// Nav element:
<nav
  id="main-nav"
  style={{
    position: 'fixed',         // home: fixed, menu: sticky
    top: 0, left: 0, right: 0,
    zIndex: 100,
    padding: '16px 64px',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(16px)',   // BUKAN Tailwind backdrop-blur-md (12px)
    borderBottom: '1px solid transparent',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }}
>
```

### Cart button:
```tsx
// width: 40px, height: 40px
// border-radius: 10px (BUKAN rounded-full, BUKAN rounded-lg)
// border: 1px solid #e5e7eb
// hover: border-color #16a34a, color #16a34a (background TETAP white)

// Badge:
// position absolute, top: -5px, right: -5px
// width: 18px, height: 18px, border-radius: 50%
// background: #16a34a, color: white
// border: 2px solid white   ← penting!
// font-size: 10px, font-weight: 700
```

### Order Now button:
```tsx
// padding: 10px 22px
// background: #16a34a, border-radius: 100px (pill)
// font-size: 14px, font-weight: 600
// icon: <Zap size={14} />
// hover: background #15803d, transform translateY(-1px)
// transition: background 0.2s, transform 0.2s
// TIDAK ADA box-shadow
```

---

## FIX 3: `src/components/sections/Hero.tsx`

### Section container:
```tsx
<section
  className="hero-section"    // untuk ::before decorative circle
  style={{
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '100px 64px 64px',
    gap: '64px',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%)',
  }}
>
```

### Animasi hero — pakai CSS class, BUKAN Framer Motion:
```tsx
// Tambahkan className langsung, keyframes sudah di globals.css
<div className="hero-tag">...</div>      // fadeUp 0.1s
<h1 className="hero-title">...</h1>     // fadeUp 0.3s
<p className="hero-desc">...</p>        // fadeUp 0.5s
<div className="hero-cta">...</div>     // fadeUp 0.7s
<div className="hero-stats">...</div>   // fadeUp 0.9s
<div className="hero-visual">...</div>  // fadeLeft 0.4s
```

### Hero title — "Delivered" harus italic + hijau:
```tsx
<h1 className="hero-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
  Fresh Food,<br />
  <span style={{ color: '#16a34a', fontStyle: 'italic' }}>Delivered</span> to<br />
  Your Door.
</h1>
```

### Floating cards — positioning:
```tsx
// hero-visual wrapper: position relative
// card-1: position absolute, bottom: 28px, left: -28px
// card-2: position absolute, top: 28px, right: -28px

// fc-icon: width 40px, height 40px, border-radius 10px
// background: #dcfce7, color: #16a34a

// className "card-1" dan "card-2" untuk animasi float dari globals.css
```

### Hero image:
```tsx
// height: 500px, border-radius: 24px
// box-shadow: 0 32px 80px rgba(22,163,74,0.18)   ← hijau, bukan hitam
// overflow: hidden
// Overlay gradient: linear-gradient(to top, rgba(0,0,0,0.2), transparent 50%)
```

### Buttons:
```tsx
// btn-primary:
style={{
  padding: '14px 28px',
  background: '#16a34a',
  borderRadius: '100px',
  fontSize: 15, fontWeight: 600,
  boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
  // hover: bg #15803d, translateY(-2px), shadow 0 8px 24px rgba(22,163,74,0.35)
}}

// btn-secondary:
style={{
  padding: '14px 28px',
  background: 'transparent',
  color: '#111827',
  border: '1.5px solid #e5e7eb',   // 1.5px bukan 1px
  borderRadius: '100px',
  fontSize: 15, fontWeight: 500,
  // hover: border-color #16a34a, color #16a34a, translateY(-2px)
  // background TETAP transparent
}}
```

---

## FIX 4: `src/components/sections/FeaturedMenu.tsx`

```tsx
// Section background: #f9fafb (surface)
// Header: flex justify-between align-items-end

// btn-link "View All Menu":
// hover effect: gap 6px → 10px (arrow bergerak kanan)
// BUKAN color change
// transition: gap 0.2s

// Menu card hover:
// translateY(-6px)   ← home page pakai -6px
// box-shadow: 0 16px 40px rgba(0,0,0,0.1)

// Image zoom: transform scale(1.05), transition 0.4s
```

---

## FIX 5: `src/components/sections/BundleSection.tsx`

```tsx
// Section background: #ffffff (white/default)

// Bundle card featured (tengah):
// border: 1px solid #16a34a
// box-shadow: 0 0 0 2px rgba(22,163,74,0.15)
// Badge "Most Popular": position absolute top 14px right 14px
// background: #16a34a, color white, font-size 11px, font-weight 700

// Bundle item tags:
// background: #dcfce7, color: #15803d
// font-size 12px, font-weight 500, padding 4px 10px, border-radius 100px

// btn-bundle hover: background #15803d, translateY(-1px)

// Card hover: translateY(-6px), box-shadow 0 20px 48px rgba(0,0,0,0.1)
```

---

## FIX 6: `src/components/sections/HowItWorks.tsx`

```tsx
// Section background: #f0fdf4 (surface2)

// WAJIB: pakai className "steps-grid" dan "step-item"
// supaya ::before dashed connector dari globals.css aktif
<div className="steps-grid">
  <div className="step-item">...</div>
  ...
</div>

// Step num circle:
// width: 56px, height: 56px, border-radius: 50%
// background: white, border: 2px solid #bbf7d0
// color: #6b7280
// box-shadow: 0 4px 16px rgba(22,163,74,0.1)

// Step pertama DAN terakhir (index 0 dan 3):
// background: #16a34a, border-color: #16a34a, color: white
// Step tengah (index 1 dan 2): tetap white/muted

// Icons:
// step 1: Utensils, step 2: ShoppingCart, step 3: CreditCard, step 4: Smile
```

---

## FIX 7: `src/components/sections/USPStrip.tsx`

```tsx
// background: #16a34a (solid green)
// padding: 18px 64px
// display: flex, justify-content: center, gap: 64px

// Setiap item:
// display flex, align-items center, gap 8px
// color: white, font-size: 14px, font-weight: 500

// Icons (Lucide, size 16):
// Fast Delivery: Truck
// Fresh Ingredients: Leaf
// Healthy: Heart
// Free Pickup: Package
```

---

## FIX 8: `src/components/menu/CategoryTabs.tsx`

```tsx
// WAJIB pakai className "cat-tab" dan "cat-tab active"
// Supaya styling dari globals.css aktif (border-bottom indicator)

// State active: simpan di useState, update saat tab diklik
// Atau baca dari URL search params (?cat=salad)

// Count badge: pakai className "cat-count"
// Active count: globals.css otomatis ubah ke green-light bg

// Tabs data:
const tabs = [
  { id: 'all',    label: 'All',       icon: LayoutGrid,  count: 12 },
  { id: 'salad',  label: 'Salad',     icon: Leaf,        count: 4  },
  { id: 'bowl',   label: 'Rice Bowl', icon: Utensils,    count: 3  },
  { id: 'drinks', label: 'Drinks',    icon: GlassWater,  count: 3  },
  { id: 'snack',  label: 'Snack',     icon: Sandwich,    count: 2  },
]
```

---

## FIX 9: `src/components/menu/FilterSidebar.tsx`

```tsx
// Checkbox harus CUSTOM (bukan <input type="checkbox"> native)
// Pakai className "check-box" dan "check-item checked"
// Styling dari globals.css

// Implementasi toggle:
const [checked, setChecked] = useState(false)
<div
  className={`check-item ${checked ? 'checked' : ''}`}
  onClick={() => setChecked(!checked)}
>
  <div className="check-box">
    {checked && <Check size={12} />}
  </div>
  <span className="check-label">Vegetarian</span>
  <span className="check-num">6</span>
</div>

// Search input:
// padding: 10px 16px 10px 40px (kiri untuk icon)
// border: 1px solid #e5e7eb, border-radius: 10px
// focus: border-color #16a34a
// background: #f9fafb, focus background: white

// Sort select:
// width: 100%, padding: 10px 14px
// border: 1px solid #e5e7eb, border-radius: 10px
// background: #f9fafb, focus border-color: #16a34a

// Filter card wrapper:
// background: white, border: 1px solid #e5e7eb
// border-radius: 16px, padding: 20px

// Filter title:
// font-size: 13px, font-weight: 700
// text-transform: uppercase, letter-spacing: 1px
// color: #6b7280
```

---

## FIX 10: `src/components/menu/ProductCard.tsx`

```tsx
// Card hover: translateY(-4px)   ← menu page -4px (beda dari home -6px)
// box-shadow: 0 12px 32px rgba(0,0,0,0.09)

// Rating star: HARUS filled
// <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
// BUKAN outline star

// Separator dot:
// width: 3px, height: 3px, border-radius: 50%, background: #9ca3af

// Stock text:
// "In Stock": color #16a34a, font-size 12px
// "Stok Terbatas": color #f59e0b, font-size 12px

// Wishlist button:
// position absolute, top: 10px, right: 10px
// width: 32px, height: 32px, border-radius: 50%
// background: white, color: #6b7280
// box-shadow: 0 2px 8px rgba(0,0,0,0.1)
// hover: color #ef4444, transform scale(1.1)
// background TETAP white

// Badge:
// position absolute, top: 10px, left: 10px
// font-size: 11px, font-weight: 600, padding: 3px 10px, border-radius: 100px
// bestseller: bg #16a34a | new: bg #f59e0b | promo: bg #ef4444

// Product name: font-family Playfair Display, font-size 16px
// Category: font-size 11px, color #16a34a, uppercase, letter-spacing 1px

// btn-add hover: background #15803d, transform scale(1.1)   ← scale, bukan translateY

// Price original (promo): font-size 12px, color #9ca3af, text-decoration line-through, margin-left 4px
```

---

## FIX 11: `src/components/layout/Footer.tsx`

```tsx
// background: #111827

// footer-links a:
// color: #d1d5db   ← BUKAN #9ca3af, lebih terang
// hover: color #16a34a

// social-btn hover:
// background: #16a34a, color: white, border-color: #16a34a
// (background dari #1f2937 → #16a34a saat hover)

// footer-bottom: border-top 1px solid #1f2937
// text: #6b7280, font-size 13px
```

---

## FIX 12: `src/hooks/useScrollReveal.ts`

```tsx
// Implementasi yang benar:
import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, i * 80)   // stagger 80ms
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// Cara pakai di page:
// 1. Import hook di page.tsx atau layout component
// 2. Panggil useScrollReveal() di dalam component
// 3. Tambahkan className="reveal" ke element yang mau animate
// JANGAN pakai Framer Motion whileInView untuk sections — pakai CSS class ini
```

---

## RINGKASAN: FILE YANG PERLU DIEDIT

| File | Yang perlu difix |
|------|-----------------|
| `globals.css` | Tambah keyframes, hero classes, steps-grid::before, cat-tab, check-box |
| `Navbar.tsx` | Logo 3 bagian, scroll effect, blur 16px, cart badge border putih |
| `Hero.tsx` | CSS animation classes (bukan Framer), btn border 1.5px, image shadow hijau |
| `FeaturedMenu.tsx` | bg surface, btn-link gap hover, card hover -6px |
| `BundleSection.tsx` | Featured card border green, bundle tags, card hover -6px |
| `HowItWorks.tsx` | className steps-grid + step-item, first/last step hijau |
| `USPStrip.tsx` | bg solid green, gap 64px, icons |
| `CategoryTabs.tsx` | className cat-tab + active, count badge |
| `FilterSidebar.tsx` | Custom checkbox dengan check-item/check-box classes |
| `ProductCard.tsx` | Star filled, hover -4px, wishlist hover merah, badge positioning |
| `Footer.tsx` | Link color #d1d5db, social hover green |
| `useScrollReveal.ts` | IntersectionObserver + classList.add('visible') |

**File yang TIDAK perlu disentuh:**
- `src/app/layout.tsx` — kecuali Google Fonts belum ada
- `src/store/cart.ts`
- `src/lib/api.ts`, `auth.ts`, `utils.ts`
- `src/types/index.ts`
- `src/middleware.ts`
- Semua file di `src/app/admin/*`, `src/app/auth/*`, `src/app/cart/*`, `src/app/checkout/*`, `src/app/orders/*`
- `src/components/admin/*`
- `src/components/ui/EmptyState.tsx`, `StatusBadge.tsx`
