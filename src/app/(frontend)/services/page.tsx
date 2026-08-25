import type { Metadata } from 'next'
import Image from 'next/image'
import { founderHero } from '@/lib/brand'
import { Quote } from 'lucide-react'
import {
  serviceBadges,
  serviceCategories,
  services,
  testimonials,
  whyChooseUs,
} from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { IconBadge } from '@/components/ui/IconBadge'
import { CtaBand } from '@/components/layout/CtaBand'
import { ServiceGrid } from '@/components/services/ServiceGrid'

export const metadata: Metadata = {
  title: 'Programs & Services',
  description:
    'Transformational coaching, speaking, webinars, and consulting designed to empower individuals, teams, and organizations.',
}

export default function ServicesPage() {
  const featured = testimonials[0]

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="aurora-light absolute inset-0 -z-10" />

        {/*
          Container-anchored, matching the homepage hero. Pinning this to the
          viewport would let the subject drift right as the window widened
          while the testimonial card stayed with the container — they collide
          and the card lands on the founder's face. See Hero.tsx.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <div className="container-page relative h-full">
            <div
              data-testid="hero-photo"
              className="absolute right-10 top-0 h-[min(100%,30rem)] w-[38%] xl:h-[min(100%,34rem)] xl:w-[52%]"
            >
              <Image
                src={founderHero}
                alt=""
                fill
                priority
                sizes="(min-width: 1280px) 52vw, 38vw"
                className="object-cover object-left-top"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-canvas)_0%,rgb(247_247_251/0.9)_12%,rgb(247_247_251/0.35)_26%,transparent_44%)]" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_top,var(--color-canvas),transparent)]" />
              <div className="absolute inset-y-0 right-0 w-64 bg-[linear-gradient(to_left,var(--color-canvas)_0%,rgb(247_247_251/0.55)_45%,transparent_100%)]" />
            </div>
          </div>
        </div>

        <div className="container-page relative pb-14 pt-8 md:pt-12 lg:pt-20">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start">
            <div className="max-w-xl">
              <p className="eyebrow eyebrow-rule">
                Certified Life Coach &amp; Leadership Consultant
              </p>

              <h1 className="mt-7 font-display text-[2.5rem] leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                Programs &amp; <span className="text-violet-500">Services</span>
              </h1>

              <p className="swoosh mt-3 inline-block font-display text-xl italic text-violet-500 sm:text-2xl">
                Coaching. Speaking. Consulting. Impact.
              </p>

              <p className="mt-7 leading-relaxed text-body">
                Explore transformational programs and services designed to empower
                individuals, teams, and organizations to break through limits, lead with
                purpose, and create lasting change.
              </p>

              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
                {serviceBadges.map((badge) => (
                  <li key={badge.title} className="flex items-center gap-3">
                    <IconBadge name={badge.icon} size="sm" />
                    <p className="text-[0.8125rem] font-medium leading-tight text-body">
                      {badge.title}
                      <br />
                      {badge.subtitle}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating testimonial, as on ATC3 */}
            <figure
              data-testid="hero-testimonial"
              className="hidden rounded-2xl bg-white/95 p-5 shadow-card-hover backdrop-blur-sm xl:block"
            >
              <Quote className="size-6 fill-violet-200 text-violet-200" />
              <blockquote className="mt-3 text-[0.8125rem] leading-relaxed text-body">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-4 border-t border-lavender-300 pt-3">
                <p className="text-sm font-semibold text-ink">— {featured.author}</p>
                <p className="mt-0.5 text-[0.8125rem] text-violet-500">{featured.role}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Filterable listing ---------- */}
      <section className="pb-16 md:pb-20" aria-labelledby="listing-heading">
        <div className="container-page">
          <h2 id="listing-heading" className="sr-only">
            All programs and services
          </h2>
          <ServiceGrid services={services} categories={serviceCategories} />

          {/* ---------- Why choose us ---------- */}
          <ul className="mt-8 grid gap-6 rounded-2xl bg-lavender-100 p-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {whyChooseUs.map((item, i) => (
              <li
                key={item.title}
                className={
                  i > 0
                    ? 'flex gap-4 lg:border-l lg:border-lavender-300 lg:pl-6'
                    : 'flex gap-4 lg:pr-6'
                }
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <Icon name={item.icon} className="size-5 text-indigo-600" />
                </span>
                <div>
                  <h3 className="font-display text-[0.9375rem] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Ready to Take the"
        accent="Next Step?"
        body={`Let's connect and create a plan that helps you or your organization lead with purpose and achieve lasting impact.`}
      />
    </>
  )
}
