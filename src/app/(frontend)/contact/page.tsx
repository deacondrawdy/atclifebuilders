import type { Metadata } from 'next'
import { Placeholder } from '@/components/layout/Placeholder'

export const metadata: Metadata = { title: 'Contact' }

export default function Page() {
  return (
    <Placeholder
      eyebrow="We're Here to Help"
      title="Let's Start"
      accent="the Conversation."
      body="Whether you are seeking coaching, leadership development, speaking, or community impact, our team is here to support your journey."
    />
  )
}
