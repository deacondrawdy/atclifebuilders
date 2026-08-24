import { ArrowRight, Instagram, Mail, Quote, Users } from 'lucide-react'
import { site } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

/**
 * "From our community" + "Client stories" (ATC 2).
 *
 * Both the Instagram grid and the reviews rail are empty-state by design —
 * the mockups show "coming soon" placeholders. Wire the Instagram Basic
 * Display API and the testimonials collection to fill them.
 */
export function Community() {
  return (
    <>
      {/* ---------- Instagram ---------- */}
      <section className="py-20 md:py-24" aria-labelledby="instagram-heading">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-md">
            <Eyebrow>From Our Community</Eyebrow>
            <h2 id="instagram-heading" className="mt-6 font-display text-4xl sm:text-5xl">
              Instagram
              <br />
              <span className="accent-phrase swoosh">Moments that inspire.</span>
            </h2>
            <p className="mt-7 leading-relaxed text-body">
              We celebrate growth, leadership, and purpose in action. Follow our journey
              and be part of a community that&rsquo;s building stronger lives and thriving
              communities.
            </p>
            <Button
              href={site.social.instagram}
              variant="secondary"
              size="lg"
              className="mt-8"
            >
              <Instagram className="size-[1.15rem] text-indigo-600" />
              Follow Us on Instagram
            </Button>
          </div>

          {/* Placeholder feed grid with the empty-state card floating over it */}
          <div className="relative rounded-3xl bg-lavender-100/70 p-4 sm:p-6">
            <div
              aria-hidden="true"
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-lavender-200/80"
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-xs rounded-2xl bg-white/95 px-7 py-8 text-center shadow-card-hover backdrop-blur-sm">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#625caa,#3b23a8)]">
                  <Instagram className="size-6 text-white" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">Feed coming soon!</h3>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                  We&rsquo;re curating inspiring content that uplifts, educates, and
                  connects. Check back soon for behind-the-scenes moments, client wins,
                  and community highlights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Client stories ---------- */}
      <section
        className="aurora relative overflow-hidden py-20 md:py-28"
        aria-labelledby="stories-heading"
      >
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-rule text-gold-400">Client Stories</p>
            <h2
              id="stories-heading"
              className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl"
            >
              Real People.
              <br />
              Real Impact.
              <br />
              <span className="swoosh font-display italic text-gold-400">
                Lasting Change.
              </span>
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-white/75">
              Our clients&rsquo; journeys are a testament to what&rsquo;s possible with
              clarity, confidence, and a supportive community.
            </p>
          </div>

          <div className="relative rounded-2xl bg-white/8 p-8 text-center ring-1 ring-white/15 backdrop-blur-sm md:p-10">
            <span className="absolute -top-7 left-1/2 inline-flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-violet-400 shadow-cta">
              <Quote className="size-6 fill-white text-white" />
            </span>
            <h3 className="mt-4 font-display text-2xl text-white">
              Reviews coming soon!
            </h3>
            <span
              aria-hidden="true"
              className="mx-auto mt-4 block h-px w-16 bg-gold-500"
            />
            <p className="mt-5 leading-relaxed text-white/75">
              We&rsquo;re collecting powerful stories of transformation and impact. Stay
              tuned to read how {site.name} is changing lives and strengthening
              communities.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/book" size="md" className="bg-navy-900 hover:bg-indigo-700">
                Book a Free Consultation
              </Button>
              <Button href="/community" variant="onDark" size="md">
                <Users className="size-[1.05rem]" />
                Join the Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Connect ---------- */}
      <section className="py-20 md:py-24" aria-labelledby="connect-heading">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>Connect With Us</Eyebrow>
              <h2 id="connect-heading" className="mt-6 font-display text-4xl sm:text-5xl">
                Let&rsquo;s <span className="accent-phrase swoosh">Stay Connected.</span>
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-body lg:pb-2">
              Follow us on social media for daily inspiration, leadership tips, upcoming
              events, and community highlights. We&rsquo;d love to connect with you!
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            <ConnectCard
              title="Facebook"
              body="Join our Facebook community for updates, motivation, and meaningful conversations."
              cta="Follow Us"
              href={site.social.facebook}
              gradient="linear-gradient(135deg,#1877F2,#0A5DC2)"
            />
            <ConnectCard
              title="Instagram"
              body="Get inspired by real stories, behind-the-scenes moments, and leadership insights."
              cta="Follow Us"
              href={site.social.instagram}
              gradient="linear-gradient(135deg,#F9CE34,#EE2A7B 45%,#6228D7)"
            />
            <ConnectCard
              title="Email"
              body="Have a question or want to collaborate? We'd love to hear from you."
              cta="Send a Message"
              href="/contact"
              gradient="linear-gradient(135deg,#625caa,#3b23a8)"
            />
          </ul>
        </div>
      </section>
    </>
  )
}

function ConnectCard({
  title,
  body,
  cta,
  href,
  gradient,
}: {
  title: string
  body: string
  cta: string
  href: string
  gradient: string
}) {
  const external = href.startsWith('http')
  const IconCmp = title === 'Email' ? Mail : title === 'Instagram' ? Instagram : null

  return (
    <li className="group flex gap-5 rounded-2xl bg-white p-6 shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover">
      <span
        className="inline-flex size-14 shrink-0 items-center justify-center rounded-full"
        style={{ background: gradient }}
        aria-hidden="true"
      >
        {IconCmp ? (
          <IconCmp className="size-6 text-white" strokeWidth={1.75} />
        ) : (
          <span className="font-display text-2xl font-bold text-white">f</span>
        )}
      </span>
      <div>
        <h3 className="font-display text-lg text-ink">{title}</h3>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{body}</p>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-violet-500"
        >
          {cta}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </li>
  )
}
