import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Shared interior-page hero: eyebrow, two-tone display heading with the gold
 * swoosh, intro copy, and an optional image bleeding off the right edge.
 *
 * Matches the pattern used by the About, Services, Appointments, and Contact
 * mockups, which differ only in copy and imagery.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  accentBlock = false,
  intro,
  image,
  imageAlt = '',
  imagePosition = 'center',
  children,
}: {
  eyebrow?: string
  title: string
  accent?: string
  /** Render the accent on its own line rather than inline. */
  accentBlock?: boolean
  intro?: string
  image?: string
  imageAlt?: string
  imagePosition?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="aurora-light absolute inset-0 -z-10" />

      {image && (
        <div
          aria-hidden={imageAlt === '' ? 'true' : undefined}
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-[48%] lg:block"
        >
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="48vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-canvas)_0%,rgb(247_247_251/0.9)_18%,rgb(247_247_251/0.3)_40%,transparent_58%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-canvas),transparent)]" />
          </div>
        </div>
      )}

      {/* `lg:pt-20` clears the logo plaque, which overhangs the header bar. */}
      <div className="container-page relative pb-14 pt-8 md:pb-20 md:pt-12 lg:pt-20">
        <div className={cn('max-w-2xl', image && 'lg:max-w-xl')}>
          {eyebrow && <p className="eyebrow eyebrow-rule">{eyebrow}</p>}

          <h1
            className={cn(
              'font-display text-[2.5rem] leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]',
              eyebrow ? 'mt-7' : 'mt-0',
            )}
          >
            {title}
            {accent && (
              <>
                {accentBlock ? <br /> : ' '}
                <span className="accent-phrase swoosh">{accent}</span>
              </>
            )}
          </h1>

          {intro && (
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-body">{intro}</p>
          )}

          {children}
        </div>
      </div>
    </section>
  )
}
