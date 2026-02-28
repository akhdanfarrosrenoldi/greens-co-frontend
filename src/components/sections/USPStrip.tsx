import { Truck, Leaf, Heart, Package } from 'lucide-react'

const items = [
  { icon: Truck,   label: 'Fast Delivery (30 min)' },
  { icon: Leaf,    label: 'Fresh Local Ingredients' },
  { icon: Heart,   label: 'Healthy & Nutritious' },
  { icon: Package, label: 'Free Pickup Available' },
]

export default function USPStrip() {
  return (
    <div style={{ background: '#16a34a', padding: '18px 64px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 64 }}>
      {items.map(({ icon: Icon, label }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ffffff', fontSize: 14, fontWeight: 500 }}>
          <Icon size={16} color="#ffffff" />
          {label}
        </div>
      ))}
    </div>
  )
}
