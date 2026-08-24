import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, ChevronRight, Compass, Quote } from 'lucide-react'
import { leadership, testimonials } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'

export const metadata: Metadata = {
  title: 'Leadership Background',
  description:
    'A lifetime of leadership. A legacy of impact. The background behind ATC Life Builders.',
}

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Leadership Background' },
]

export default function LeadershipPage() {
  const featured = testimonials[0]

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="aurora-light absolute inset-0 -z-10" />

        <div className="container-page relative pb-16 pt-8 md:pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-muted transition-colors hover:text-indigo-600"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-violet-500">
                      {crumb.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight
                      className="size-3.5 text-muted/60"
                      aria-hidden="true"
                      strokeWidth={2}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
            <div>
              <p className="eyebrow">A Lifetime of Leadership. A Legacy of Impact.</p>

              <h1 className="mt-6 font-display text-[2.5rem] leading-[1.12] tracking-tight sm:text-5xl">
                Leadership Backed by{' '}
                <span className="accent-phrase swoosh">
                  Service, Experience, and Purpose.
                </span>
              </h1>

              <p className="mt-8 text-[0.9375rem] leading-relaxed text-body">
                {leadership.bio}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/book" size="lg">
                  <Calendar className="size-[1.15rem]" />
                  Book a Consultation
                  <ArrowRight className="size-[1.05rem]" />
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  <Compass className="size-[1.15rem] text-indigo-600" />
                  Explore Leadership Programs
                </Button>
              </div>
            </div>

            <figure className="overflow-hidden rounded-2xl shadow-card-hover">
              <Image
                src="/brand/founder-hero.jpg"
                alt="Mr. Oviedo, Founder of ATC Life Builders"
                width={888}
                height={892}
                priority
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="aurora flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center">
                <div className="sm:flex-1">
                  <p className="font-display text-2xl italic text-gold-400">
                    Mr. Oviedo
                  </p>
                  <p className="mt-1 text-sm text-white/80">Founder, Leader, Mentor</p>
                </div>
                <div className="flex gap-3 sm:max-w-[13rem] sm:border-l sm:border-white/20 sm:pl-5">
                  <Quote className="size-5 shrink-0 fill-white/30 text-white/30" />
                  <p className="text-[0.8125rem] leading-relaxed text-white/85">
                    {leadership.quote}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Credentials ---------- */}
      <section className="pb-16 md:pb-20" aria-labelledby="credentials-heading">
        <div className="container-page">
          <h2 id="credentials-heading" className="sr-only">
            Leadership credentials
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {leadership.credentials.map((item) => (
              <li key={item.title}>
                <article className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-center gap-4">
                    <IconBadge name={item.icon} size="md" tone="soft" />
                    <h3 className="font-display text-xl leading-tight text-ink">
                      {'stat' in item && item.stat && (
                        <span className="mr-1.5 text-2xl font-semibold">{item.stat}</span>
                      )}
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-[0.875rem] leading-relaxed text-body">
                    {item.body}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Testimonial ---------- */}
      <section
        className="aurora relative overflow-hidden py-16 md:py-20"
        aria-labelledby="voices-heading"
      >
        <div className="container-page relative text-center">
          <p className="eyebrow text-gold-400">Voices of Impact</p>
          <h2
            id="voices-heading"
            className="mt-5 font-display text-3xl text-white sm:text-4xl"
          >
            Trusted by Leaders.{' '}
            <span className="swoosh italic">Transforming Lives.</span>
          </h2>

          <figure className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white/95 p-7 text-left shadow-card md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Quote className="size-7 shrink-0 fill-violet-200 text-violet-200" />
              <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-body">
                &ldquo;Working with Mr. Oviedo has been a turning point in our leadership
                journey. His guidance and clarity have helped our team grow with purpose
                and confidence.&rdquo;
              </blockquote>
              <figcaption className="shrink-0 sm:border-l sm:border-lavender-300 sm:pl-6">
                <p className="font-display font-semibold text-ink">— {featured.author}</p>
                <p className="mt-0.5 text-sm text-violet-500">Executive Director</p>
              </figcaption>
            </div>
          </figure>

          <p className="mt-6 text-xs text-white/60">
            {/* Placeholder set — see README. */}
            More client stories coming soon.
          </p>
        </div>
      </section>
    </>
  )
}
