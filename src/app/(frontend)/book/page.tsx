import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Book a Consultation' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Schedule Your Session Online"
      title="Online"
      accent="Appointments."
      body="Choose the service that fits your goals, pick a time that works for you, and take the next step toward growth and impact."
    />
  )
}
