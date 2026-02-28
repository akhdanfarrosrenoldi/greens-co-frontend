import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  positive?: boolean
  icon: LucideIcon
  color?: string
}

export default function StatsCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
  color = 'bg-[#dcfce7] text-green-DEFAULT',
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 flex items-start gap-4">
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', color)}>
        <Icon size={22} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted font-medium mb-1">{title}</p>
        <p className="font-heading text-2xl font-bold text-[#111827]">{value}</p>
        {change && (
          <p
            className={cn(
              'text-xs font-medium mt-1',
              positive ? 'text-green-DEFAULT' : 'text-red-500'
            )}
          >
            {positive ? '↑' : '↓'} {change} vs last month
          </p>
        )}
      </div>
    </div>
  )
}
