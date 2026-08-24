'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ServiceCard, type Service } from './ServiceCard'

const SORTS = ['Popular', 'Price: Low to High', 'Price: High to Low', 'A–Z'] as const
type Sort = (typeof SORTS)[number]

/**
 * Filterable services listing (ATC3).
 *
 * Filtering runs client-side over a small, fully-rendered list — every card is
 * already in the payload, so this stays instant and needs no network round
 * trip. Revisit if the catalogue grows past a couple of dozen services.
 */
export function ServiceGrid({
  services,
  categories,
}: {
  services: readonly Service[]
  categories: readonly string[]
}) {
  const [active, setActive] = useState(categories[0])
  const [sort, setSort] = useState<Sort>('Popular')

  const visible = useMemo(() => {
    const all = active === categories[0]
    const filtered = all ? [...services] : services.filter((s) => s.category === active)

    // "Contact for pricing" has no numeric value; sort those last.
    const amount = (price: string) => {
      const match = price.match(/[\d.]+/)
      return match ? Number(match[0]) : Number.POSITIVE_INFINITY
    }

    switch (sort) {
      case 'Price: Low to High':
        return filtered.sort((a, b) => amount(a.price) - amount(b.price))
      case 'Price: High to Low':
        return filtered.sort((a, b) => {
          const [x, y] = [amount(a.price), amount(b.price)]
          if (!Number.isFinite(x)) return 1
          if (!Number.isFinite(y)) return -1
          return y - x
        })
      case 'A–Z':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [services, categories, active, sort])

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card md:p-7">
      <div className="flex flex-col gap-4 border-b border-lavender-300 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter services" className="flex flex-wrap gap-1">
          {categories.map((category) => {
            const selected = category === active
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(category)}
                className={cn(
                  'rounded-lg px-4 py-2.5 text-sm transition-all duration-200 ease-out-soft',
                  selected
                    ? 'bg-indigo-700 font-medium text-white shadow-cta'
                    : 'text-body hover:bg-lavender-100 hover:text-indigo-600',
                )}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div className="relative shrink-0">
          <label htmlFor="service-sort" className="sr-only">
            Sort services
          </label>
          <select
            id="service-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 w-full appearance-none rounded-lg border border-lavender-300 bg-white pl-4 pr-10 text-sm text-body transition-colors hover:border-violet-300 focus:border-indigo-600 focus:outline-none lg:w-52"
          >
            {SORTS.map((option) => (
              <option key={option} value={option}>
                Sort by {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-16 text-center text-body">
          No services in this category yet — check back soon.
        </p>
      )}

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? 'service' : 'services'}
        {active === categories[0] ? '' : ` in ${active}`}.
      </p>
    </div>
  )
}
