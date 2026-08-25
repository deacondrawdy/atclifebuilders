import Image from 'next/image'
import { ArrowRight, Calendar, Compass, Heart, Quote, Star } from 'lucide-react'
import { pillars, testimonials, trustBadges } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { IconBadge } from '@/components/ui/IconBadge'

export function Hero() {
  const featured = testimonials[0]

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Soft lavender field + the gold/violet aurora sweep at bottom-right */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="aurora-light absolute inset-0" />
        <div className="absolute -bottom-32 -right-24 size-[46rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(98_92_170/0.20),transparent_65%)] blur-2xl" />
        <div className="absolute -bottom-10 right-0 h-72 w-[55%] bg-[radial-gradient(ellipse_at_bottom_right,rgb(216_179_94/0.16),transparent_60%)]" />
      </div>

      {/*
        Portrait layer.

        CRITICAL: this is anchored to the *content container*, not the viewport.
        The pillar cards live in the container's right grid column, so if the
        photo were pinned to the viewport (`right-0 w-54%`) the subject would
        drift right as the window widened — at ~0.73vw — while the cards only
        moved at ~0.5vw + 280px. They converge, and by 1920px the cards sit
        squarely over the founder's face.

        Anchoring both to the same box makes the gap between the face and the
        cards constant at every width. The source image is deliberately
        left-weighted with blurred depth on the right, so the cards overlay
        background rather than the subject.

        `w-[52%]` is load-bearing: it places the subject in the ~208px gap
        between the text column and the card rail. The container is capped at
        80rem, so above 1280px this geometry is identical at every width.

        Shown from xl only. Between lg and xl the grid squeezes the text column
        against the card rail, leaving no clear space for a face, so the photo
        would land under the headline. Below xl the hero runs on the aurora
        background alone.

        tests/e2e/hero-layout.e2e.spec.ts guards all of this.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden xl:block"
      >
        <div className="container-page relative h-full">
          <div
            data-testid="hero-photo"
            className="absolute right-10 top-0 h-[min(100%,40rem)] w-[52%]"
          >
            <Image
              src="/brand/founder-hero.jpg"
              alt=""
              fill
              priority
              sizes="52vw"
              className="object-cover object-left-top"
            />
            {/* Feather every edge so the photo dissolves into the canvas */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-canvas)_0%,rgb(247_247_251/0.9)_12%,rgb(247_247_251/0.35)_26%,transparent_44%)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(to_top,var(--color-canvas)_8%,transparent)]" />
            <div className="absolute inset-y-0 right-0 w-64 bg-[linear-gradient(to_left,var(--color-canvas)_0%,rgb(247_247_251/0.55)_45%,transparent_100%)]" />
          </div>
        </div>
      </div>

      {/*
        `lg:pt-20` clears the logo plaque, which hangs 10rem down from the top
        of the page while the header bar is only 5rem tall. Without it the
        plaque covers the start of the eyebrow line.
      */}
      <div className="container-page relative pb-16 pt-8 md:pb-24 md:pt-12 lg:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
          {/* ---------- Left: headline + CTAs + proof ---------- */}
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule">Certified Life Coach &amp; Leadership Consultant</p>

            <h1
              id="hero-heading"
              className="mt-7 font-display text-[2.75rem] leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            >
              Clarity. Confidence.
              <br />
              Purpose.{' '}
              <span className="accent-phrase swoosh">Life&nbsp;by&nbsp;Design.</span>
            </h1>

            <p className="mt-8 font-display text-xl font-semibold text-indigo-600 sm:text-2xl">
              Transform Your Life. Lead with Impact.
            </p>

            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-body">
              ATC Life Builders empowers individuals, families, organizations, and
              communities to break through limits, lead with purpose, and create lasting
              change through certified coaching and leadership development.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/book" size="lg">
                <Calendar className="size-[1.15rem]" />
                Book a Free Consultation
                <ArrowRight className="size-[1.05rem]" />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                <Compass className="size-[1.15rem] text-indigo-600" />
                Explore Programs
                <ArrowRight className="size-[1.05rem]" />
              </Button>
            </div>

            {/* Social proof row */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
              <div className="flex items-center gap-4">
                <AvatarStack />
                <div>
                  <div className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="mt-1.5 font-display text-lg font-semibold text-ink">
                    5.0 from 100+ clients
                  </p>
                  <p className="mt-0.5 max-w-[15rem] text-xs leading-snug text-muted">
                    Trusted by clients seeking personal growth and leadership clarity.
                  </p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-4">
                {trustBadges.map((badge) => (
                  <li key={badge.title} className="flex w-24 flex-col items-center text-center">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-lavender-200 text-indigo-600">
                      <Icon name={badge.icon} className="size-5" />
                    </span>
                    <p className="mt-2 text-[0.6875rem] font-medium leading-tight text-body">
                      {badge.title}
                      <br />
                      {badge.subtitle}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured testimonial */}
            <figure className="mt-10 max-w-xl rounded-2xl bg-white p-6 shadow-card">
              <div className="flex gap-4">
                <Quote className="size-7 shrink-0 fill-violet-200 text-violet-200" />
                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                  <blockquote className="flex-1 text-sm leading-relaxed text-body">
                    {featured.quote}
                  </blockquote>
                  <figcaption className="shrink-0 border-lavender-300 sm:border-l sm:pl-5">
                    <p className="font-display font-semibold text-ink">— {featured.author}</p>
                    <p className="mt-0.5 text-sm text-violet-500">{featured.role}</p>
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>

          {/* ---------- Right: floating pillar cards ---------- */}
          <ul data-testid="hero-pillars" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="group flex gap-4 rounded-2xl bg-white/95 p-5 shadow-card backdrop-blur-sm transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover"
              >
                <IconBadge name={pillar.icon} size="md" />
                <div>
                  <h2 className="font-sans text-[0.9375rem] font-semibold leading-snug text-ink">
                    {pillar.title}
                  </h2>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Donation banner riding the bottom of the hero */}
      <div className="container-page relative pb-14">
        <div className="aurora flex flex-col items-center gap-5 rounded-2xl px-6 py-6 shadow-card md:flex-row md:gap-8 md:px-8">
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-white/95">
            <Heart className="size-6 fill-gold-500 text-gold-500" strokeWidth={1.5} />
          </span>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-xl text-gold-400">Help Our Cause</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/80">
              Your support helps us empower more lives and build stronger communities.
            </p>
          </div>
          <Button href="/donate" variant="onDark" size="lg" className="shrink-0">
            <Heart className="size-[1.1rem] fill-indigo-700" />
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  )
}

/**
 * Overlapping client avatars. Rendered as initials-on-gradient placeholders
 * until real client photos (with signed releases) are supplied.
 */
function AvatarStack() {
  const seeds = ['DR', 'MJ', 'AL', 'TC', 'RB']
  return (
    <ul className="flex -space-x-3" aria-label="Recent clients">
      {seeds.map((initials, i) => (
        <li
          key={initials}
          className="inline-flex size-11 items-center justify-center rounded-full ring-2 ring-canvas"
          style={{
            background: `linear-gradient(135deg, hsl(${248 - i * 9} 42% ${58 + i * 4}%), hsl(${252 - i * 9} 38% ${40 + i * 4}%))`,
          }}
        >
          <span className="text-[0.6875rem] font-semibold tracking-wide text-white/95">
            {initials}
          </span>
        </li>
      ))}
    </ul>
  )
}
