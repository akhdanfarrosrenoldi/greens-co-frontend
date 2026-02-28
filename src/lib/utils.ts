import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export function getOrderStatusLabel(
  status: string
): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    PENDING:     { label: 'Pending',     color: 'bg-amber-100 text-amber-700' },
    PAID:        { label: 'Paid',        color: 'bg-blue-100 text-blue-700' },
    PROCESSING:  { label: 'Processing',  color: 'bg-blue-100 text-blue-700' },
    READY:       { label: 'Ready',       color: 'bg-purple-100 text-purple-700' },
    ON_DELIVERY: { label: 'On Delivery', color: 'bg-orange-100 text-orange-700' },
    COMPLETED:   { label: 'Completed',   color: 'bg-[#dcfce7] text-[#15803d]' },
    CANCELLED:   { label: 'Cancelled',   color: 'bg-red-100 text-red-700' },
  }
  return map[status] || { label: status, color: 'bg-gray-100 text-gray-700' }
}
