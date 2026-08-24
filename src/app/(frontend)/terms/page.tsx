import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Terms and Conditions' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Legal"
      title="Terms and Conditions"
      body="Our terms of service are being finalised."
    />
  )
}
