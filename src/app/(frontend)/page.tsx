import { Community } from '@/components/home/Community'
import { Hero } from '@/components/home/Hero'
import { Newsletter } from '@/components/home/Newsletter'
import { Services } from '@/components/home/Services'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Community />
      <Newsletter />
    </>
  )
}
