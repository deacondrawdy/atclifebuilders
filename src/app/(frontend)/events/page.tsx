import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Events' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Events"
      title="Workshops,"
      accent="Seminars & Retreats."
      body="Live and virtual gatherings designed to educate, inspire, and equip."
    />
  )
}
