import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * The recurring closing call-to-action band. Appears on nearly every mockup
 * with the same anatomy: circular icon, two-tone display heading, supporting
 * line, and a single CTA.
 *
 * `tone="dark"` is the aurora gradient version (ATC3, ATC6 footer band);
 * `tone="light"` is the pale card version (ATC6 bottom).
 */
export function CtaBand({
  title,
  accent,
  body,
  cta = 'Book a Free Consultation',
  href = '/book',
  note,
  tone = 'dark',
  className,
}: {
  title: string
  accent?: string
  body: string
  cta?: string
  href?: string
  note?: string
  tone?: 'dark' | 'light'
  className?: string
}) {
  const dark = tone === 'dark'

  return (
    <section className={cn('container-page py-14 md:py-20', className)}>
      <div
        className={cn(
          'flex flex-col items-center gap-6 rounded-2xl px-6 py-8 md:flex-row md:gap-10 md:px-10 md:py-9',
          dark ? 'aurora shadow-card' : 'border border-lavender-300 bg-white shadow-card',
        )}
      >
        <span
          className={cn(
            'inline-flex size-16 shrink-0 items-center justify-center rounded-2xl',
            dark ? 'bg-white/95' : 'bg-lavender-200',
          )}
        >
          <Calendar
            className={cn('size-7', dark ? 'text-gold-600' : 'text-indigo-600')}
            strokeWidth={1.5}
          />
        </span>

        <div className="flex-1 text-center md:text-left">
          <h2
            className={cn(
              'font-display text-2xl leading-snug sm:text-[1.75rem]',
              dark ? 'text-gold-400' : 'text-ink',
            )}
          >
            {title}
            {accent && (
              <>
                {' '}
                <span
                  className={cn(
                    'font-display italic',
                    dark ? 'text-white' : 'text-violet-500',
                  )}
                >
                  {accent}
                </span>
              </>
            )}
          </h2>
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed',
              dark ? 'text-white/80' : 'text-body',
            )}
          >
            {body}
          </p>
        </div>

        <div className="shrink-0 text-center">
          <Button href={href} variant={dark ? 'onDark' : 'primary'} size="lg">
            {cta}
            <ArrowRight className="size-[1.05rem]" />
          </Button>
          {note && (
            <p
              className={cn(
                'mt-3 max-w-[14rem] text-xs leading-snug',
                dark ? 'text-white/65' : 'text-muted',
              )}
            >
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
