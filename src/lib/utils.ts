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
    PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    PAID: { label: 'Paid', color: 'bg-blue-100 text-blue-800' },
    PROCESSING: { label: 'Processing', color: 'bg-purple-100 text-purple-800' },
    READY: { label: 'Ready', color: 'bg-green-100 text-green-800' },
    ON_DELIVERY: { label: 'On Delivery', color: 'bg-orange-100 text-orange-800' },
    COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  }
  return map[status] || { label: status, color: 'bg-gray-100 text-gray-800' }
}
