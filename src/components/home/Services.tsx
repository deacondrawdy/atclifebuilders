import { services } from '@/lib/site'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ServiceCard } from '@/components/services/ServiceCard'

export function Services() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="services-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>Programs &amp; Services</Eyebrow>
          <h2
            id="services-heading"
            className="mt-6 font-display text-4xl leading-tight sm:text-5xl"
          >
            Coaching. Speaking. Consulting.{' '}
            <span className="accent-phrase swoosh">Impact.</span>
          </h2>
          <p className="mt-7 text-[1.0625rem] leading-relaxed text-body">
            Explore transformational programs and services designed to empower
            individuals, teams, and organizations to break through limits, lead with
            purpose, and create lasting change.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
