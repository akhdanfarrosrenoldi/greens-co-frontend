import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  desc?: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({
  icon: Icon,
  title,
  desc,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-8">
      <div className="w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-5">
        <Icon size={36} className="text-green-DEFAULT" />
      </div>
      <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
      {desc && <p className="text-sm text-muted mb-6 max-w-xs">{desc}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-7 py-3 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark hover:-translate-y-px transition-all text-sm"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
