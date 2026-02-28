import { Truck, Leaf, Heart, Package } from 'lucide-react'

const items = [
  { icon: Truck, text: 'Fast Delivery (30 min)' },
  { icon: Leaf, text: 'Fresh Local Ingredients' },
  { icon: Heart, text: 'Healthy & Nutritious' },
  { icon: Package, text: 'Free Pickup Available' },
]

export default function USPStrip() {
  return (
    <div className="bg-green-DEFAULT px-8 md:px-16 py-[18px] flex flex-wrap justify-center gap-16">
      {items.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2 text-white text-sm font-medium">
          <Icon size={16} />
          {text}
        </div>
      ))}
    </div>
  )
}
