import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Shop' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Shop"
      title="Books, Resources,"
      accent="and More."
      body="Physical and digital resources to support your growth. The storefront is being prepared."
    />
  )
}
