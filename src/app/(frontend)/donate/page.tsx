import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Donate' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Help Our Cause"
      title="Your Support"
      accent="Changes Lives."
      body="Your generous donation funds our mission and helps build a stronger community."
    />
  )
}
