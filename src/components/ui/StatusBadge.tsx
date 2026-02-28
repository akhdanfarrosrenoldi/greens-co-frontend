interface StatusBadgeProps {
  status: string
  className?: string
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  PENDING:     { label: 'Pending',     cls: 'bg-amber-100 text-amber-700' },
  PAID:        { label: 'Paid',        cls: 'bg-blue-100 text-blue-700' },
  PROCESSING:  { label: 'Processing',  cls: 'bg-blue-100 text-blue-700' },
  READY:       { label: 'Ready',       cls: 'bg-purple-100 text-purple-700' },
  ON_DELIVERY: { label: 'On Delivery', cls: 'bg-orange-100 text-orange-700' },
  COMPLETED:   { label: 'Completed',   cls: 'bg-[#dcfce7] text-[#15803d]' },
  CANCELLED:   { label: 'Cancelled',   cls: 'bg-red-100 text-red-700' },
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { label, cls } = STATUS_MAP[status] ?? {
    label: status,
    cls: 'bg-gray-100 text-gray-700',
  }
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${cls} ${className}`}>
      {label}
    </span>
  )
}
