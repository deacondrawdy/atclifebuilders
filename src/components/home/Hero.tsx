import Image from 'next/image'
import { founderHeroDesk } from '@/lib/brand'
import { ArrowRight, Calendar, Compass, Heart, Star } from 'lucide-react'
import { pillars } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'

/**
 * Layout follows the "ATC HERO BALANCED PAGE" mockup.
 *
 * From xl: two columns. Copy on the left; on the right the portrait with the
 * pillar cards in a 2x2 grid directly beneath it, so no card ever sits on the
 * founder. Below xl everything stacks: copy, portrait, cards.
 *
 * tests/e2e/hero-layout.e2e.spec.ts guards the portrait/card relationship.
 */

// Dissolve every edge of the portrait into the canvas instead of showing a
// hard photo boundary. Two gradients, intersected.
const portraitMask =
  'linear-gradient(to right, transparent 0%, #000 14%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 84%, transparent 100%)'

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Soft lavender field + the gold/violet aurora sweep at bottom-right */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="aurora-light absolute inset-0" />
        <div className="absolute -bottom-32 -right-24 size-[46rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(98_92_170/0.20),transparent_65%)] blur-2xl" />
        <div className="absolute -bottom-10 right-0 h-72 w-[55%] bg-[radial-gradient(ellipse_at_bottom_right,rgb(216_179_94/0.16),transparent_60%)]" />
      </div>

      {/*
        `lg:pt-20` clears the logo plaque, which hangs 10rem down from the top
        of the page while the header bar is only 5rem tall. Without it the
        plaque covers the start of the eyebrow line.
      */}
      <div className="container-page relative pb-12 pt-8 md:pb-16 md:pt-12 lg:pt-20">
        <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,35rem)_minmax(0,1fr)] xl:gap-10">
          {/* ---------- Left: headline + CTAs + proof ---------- */}
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule">Certified Life Coach &amp; Leadership Consultant</p>

            <h1
              id="hero-heading"
              className="mt-7 font-display text-[2.75rem] leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem] xl:text-[4rem]"
            >
              Clarity. Confidence.
              <br />
              Purpose.
              <br />
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

            {/*
              `xl:px-6`: at the default lg padding the pair is ~603px wide, wider
              than the 35rem copy column, and "Explore Programs" ran into the
              first pillar card.
            */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/book" size="lg" className="xl:px-6">
                <Calendar className="size-[1.15rem]" />
                Book a Free Consultation
                <ArrowRight className="size-[1.05rem]" />
              </Button>
              <Button href="/services" variant="secondary" size="lg" className="xl:px-6">
                <Compass className="size-[1.15rem] text-indigo-600" />
                Explore Programs
                <ArrowRight className="size-[1.05rem]" />
              </Button>
            </div>

            {/* Social proof row */}
            <div className="mt-10 flex items-center gap-4 border-t border-lavender-300 pt-8">
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
          </div>

          {/* ---------- Right: portrait with the pillar cards beneath ---------- */}
          <div className="relative xl:-mt-20">
            {/*
              From xl the portrait reaches 2.5rem past the column on both sides:
              left under the column gap, right into the container padding. That
              matches the mockup proportions without reaching the headline,
              which ends well short of the column edge.
            */}
            <div data-testid="hero-photo" className="relative aspect-[804/549] xl:-mx-10">
              <Image
                src={founderHeroDesk}
                alt=""
                fill
                priority
                sizes="(min-width: 1280px) 42.5rem, (min-width: 768px) 90vw, 100vw"
                className="object-cover"
                style={{
                  maskImage: portraitMask,
                  maskComposite: 'intersect',
                  WebkitMaskImage: portraitMask,
                  WebkitMaskComposite: 'source-in',
                }}
              />
              {/* Thin gold arc hugging the portrait's left edge, as in the mockup */}
              <svg
                aria-hidden="true"
                viewBox="0 0 60 240"
                fill="none"
                className="absolute -left-4 bottom-[4%] hidden h-[48%] w-auto xl:block"
              >
                <path
                  d="M58 2 C 4 60, 4 180, 58 238"
                  stroke="rgb(216 179 94 / 0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <ul data-testid="hero-pillars" className="relative -mt-4 grid gap-4 sm:grid-cols-2">
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
