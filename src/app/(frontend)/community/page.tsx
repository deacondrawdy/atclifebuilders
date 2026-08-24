import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Community' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Community"
      title="Join a Supportive"
      accent="Community."
      body="Connect with others on a similar journey of growth and purpose."
    />
  )
}
