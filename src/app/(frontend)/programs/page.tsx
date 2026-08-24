import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Programs' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Programs"
      title="Leadership That"
      accent="Lasts."
      body="Structured programs for individuals, teams, and organizations."
    />
  )
}
