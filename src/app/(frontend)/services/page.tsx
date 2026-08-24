import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Programs & Services' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Programs & Services"
      title="Coaching. Speaking. Consulting."
      accent="Impact."
      body="Explore transformational programs designed to empower individuals, teams, and organizations."
    />
  )
}
