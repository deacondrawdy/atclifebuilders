import { ArrowLeft, Hammer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

/**
 * Shared "not built yet" page.
 *
 * Phase 1 delivers the design system and the homepage; every other route in
 * the navigation renders this so the site is fully navigable and no link
 * dead-ends in a 404. Replace each one as the real page is built.
 */
export function Placeholder({
  eyebrow,
  title,
  accent,
  body,
}: {
  eyebrow: string
  title: string
  accent?: string
  body: string
}) {
  return (
    <section className="aurora-light relative overflow-hidden">
      <div className="container-page relative flex min-h-[62vh] flex-col justify-center py-24">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            {title}
            {accent && (
              <>
                {' '}
                <span className="accent-phrase swoosh">{accent}</span>
              </>
            )}
          </h1>
          <p className="mt-7 text-[1.0625rem] leading-relaxed text-body">{body}</p>

          <div className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-lavender-200 px-4 py-3 text-sm text-indigo-600">
            <Hammer className="size-[1.1rem]" strokeWidth={1.75} />
            This page is still being built.
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="secondary" size="lg">
              <ArrowLeft className="size-[1.05rem] text-indigo-600" />
              Back to Home
            </Button>
            <Button href="/book" size="lg">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
