import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Search' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Search"
      title="Find What You're"
      accent="Looking For."
      body="Site-wide search is being wired up."
    />
  )
}
