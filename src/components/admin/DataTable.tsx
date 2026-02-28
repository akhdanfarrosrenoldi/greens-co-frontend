import { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e5e7eb]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3.5 text-left text-xs font-semibold text-muted uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[#e5e7eb]">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4">
                    <div className="h-4 bg-[#f9fafb] rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-12 text-sm text-muted"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#e5e7eb] last:border-none hover:bg-[#f9fafb] transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 text-[#111827]">
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
