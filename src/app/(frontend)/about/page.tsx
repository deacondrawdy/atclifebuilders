import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'About' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="About Us"
      title="About"
      accent="ATC Life Builders."
      body="We empower youth, families, organizations, and communities to break through limits, lead with purpose, and create lasting change."
    />
  )
}
