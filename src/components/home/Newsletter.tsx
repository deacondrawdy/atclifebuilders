import { Heart, Lock, Mail, Send, ShieldCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * Newsletter + donation bands (ATC 2 / ATC4 / ATC5).
 *
 * The form posts to /api/subscribe, which is a stub until the newsletter
 * provider is chosen. Progressive-enhancement friendly: it is a real <form>
 * with a real action, so it works without JavaScript.
 */
export function Newsletter() {
  return (
    <>
      {/* ---------- Subscribe ---------- */}
      <section
        className="aurora-light relative overflow-hidden py-20 md:py-24"
        aria-labelledby="subscribe-heading"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 top-1/2 size-[38rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(216_179_94/0.12),transparent_65%)]"
        />

        <div className="container-page relative">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-14">
            <span className="relative inline-flex size-24 shrink-0 items-center justify-center rounded-full bg-lavender-200">
              <span className="absolute inset-0 animate-pulse rounded-full bg-violet-300/25" />
              <Mail className="relative size-9 text-gold-500" strokeWidth={1.5} />
            </span>

            <div className="max-w-2xl flex-1">
              <p className="eyebrow eyebrow-rule">Stay Connected</p>
              <h2
                id="subscribe-heading"
                className="mt-6 font-display text-4xl leading-tight sm:text-5xl"
              >
                Clarity. Purpose. Impact.
                <br />
                <span className="accent-phrase swoosh">Delivered to Your Inbox.</span>
              </h2>
              <p className="mt-7 max-w-xl leading-relaxed text-body">
                Subscribe to get inspiration, leadership insights, and exclusive updates on
                programs, events, and ways to make a difference.
              </p>

              <form
                action="/api/subscribe"
                method="post"
                className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 size-[1.15rem] -translate-y-1/2 text-violet-400"
                    strokeWidth={1.75}
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="h-14 w-full rounded-xl border border-lavender-300 bg-white pl-12 pr-4 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <Button type="submit" size="lg" className="shrink-0">
                  Stay Connected
                  <Send className="size-[1.05rem]" />
                </Button>
              </form>

              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-body">
                <Perk icon={<ShieldCheck className="size-[1.1rem] text-violet-400" strokeWidth={1.75} />}>
                  Purpose-driven content
                </Perk>
                <Perk icon={<Users className="size-[1.1rem] text-violet-400" strokeWidth={1.75} />}>
                  Event &amp; program updates
                </Perk>
                <Perk icon={<Heart className="size-[1.1rem] text-violet-400" strokeWidth={1.75} />}>
                  Make a lasting impact
                </Perk>
              </ul>

              <p className="mt-6 flex items-center gap-2 text-xs text-muted">
                <Lock className="size-3.5" strokeWidth={1.75} />
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Donate ---------- */}
      <section
        className="aurora relative overflow-hidden py-20 md:py-28"
        aria-labelledby="donate-heading"
      >
        <div className="container-page relative text-center">
          <p className="eyebrow text-gold-400">— Help Our Cause —</p>
          <h2
            id="donate-heading"
            className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl"
          >
            Your Support{' '}
            <span className="swoosh font-display italic text-violet-300">
              Changes Lives.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-white/75">
            Your support and contributions enable us to meet our goals and improve lives
            and conditions. Your generous donation will fund our mission and create a
            stronger community.
          </p>

          <div className="mt-10">
            <Button href="/donate" variant="onDark" size="lg">
              <Heart className="size-[1.15rem] fill-indigo-700" />
              Donate Now
            </Button>
          </div>

          {/*
            Payment marks are placeholders. Once the donation provider is chosen
            (Donorbox / Givebutter), swap these for that provider's approved
            badge assets — logos must not be recreated by hand.
          */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {['PayPal', 'Mastercard', 'VISA', 'Discover', 'AmEx'].map((mark) => (
              <li
                key={mark}
                className="rounded-md bg-white/95 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-wide text-navy-900"
              >
                {mark}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-white/65">
            <Lock className="size-3.5" strokeWidth={1.75} />
            Secure donations. Encrypted and safe.
          </p>
        </div>
      </section>
    </>
  )
}

function Perk({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      {icon}
      {children}
    </li>
  )
}
