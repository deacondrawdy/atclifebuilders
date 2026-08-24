import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Account' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Your Account"
      title="Your Account"
      body="Customer accounts are planned for a later phase."
    />
  )
}
