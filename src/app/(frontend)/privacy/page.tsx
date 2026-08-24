import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Legal"
      title="Privacy Policy"
      body="Our privacy policy is being finalised."
    />
  )
}
