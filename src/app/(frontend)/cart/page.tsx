import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Cart' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="Your Cart"
      title="Your Cart"
      body="Checkout is being connected to Stripe."
    />
  )
}
