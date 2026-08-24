import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Quote, ShieldCheck } from 'lucide-react'
import { about, impactStats, site, whatWeDo } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import { CtaBand } from '@/components/layout/CtaBand'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'About',
  description: site.description,
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About ATC"
        accent="Life Builders"
        accentBlock
        intro="We empower youth, families, organizations, and communities to break through limits, lead with purpose, and create lasting change through coaching, leadership development, and impact."
        image="/brand/books-desk.jpg"
        imagePosition="30% center"
      />

      {/* ---------- Mission & Vision + founder portrait ---------- */}
      <section className="py-16 md:py-20" aria-labelledby="mission-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-2xl border-l-4 border-gold-500 bg-white p-8 shadow-card md:p-10">
            <h2 id="mission-heading" className="sr-only">
              Our mission and vision
            </h2>

            <article className="flex gap-5">
              <IconBadge name="target" size="lg" />
              <div>
                <h3 className="font-display text-2xl text-violet-500">Our Mission</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  {about.mission}
                </p>
              </div>
            </article>

            <hr className="my-8 border-gold-200" />

            <article className="flex gap-5">
              <IconBadge name="users" size="lg" />
              <div>
                <h3 className="font-display text-2xl text-violet-500">Our Vision</h3>
                <p className="mt-3 text-[0.9375rem] italic leading-relaxed text-body">
                  {about.vision}
                </p>
              </div>
            </article>
          </div>

          <figure className="relative overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/brand/founder-portrait.jpg"
              alt={`${about.founderQuote.author} of ${site.name}`}
              width={890}
              height={490}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full min-h-[22rem] w-full object-cover object-top"
            />
            <figcaption className="absolute inset-x-0 bottom-0 aurora px-6 py-5">
              <div className="flex gap-4">
                <Quote className="size-6 shrink-0 fill-white/30 text-white/30" />
                <div>
                  <p className="font-display text-[1.0625rem] leading-snug text-white">
                    {about.founderQuote.quote}
                  </p>
                  <cite className="mt-2 block text-sm not-italic text-gold-400">
                    — {about.founderQuote.author}
                  </cite>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="py-16 md:py-20" aria-labelledby="what-we-do-heading">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">— What We Do —</p>
            <h2
              id="what-we-do-heading"
              className="mt-5 font-display text-3xl leading-snug sm:text-4xl"
            >
              Building Leaders. Strengthening Communities.{' '}
              <span className="accent-phrase">Creating Impact.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-body">
              {site.name} equips individuals and organizations with the tools, training,
              and support needed to succeed.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {whatWeDo.map((item) => (
              <li key={item.title}>
                <article className="group flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1.5 hover:shadow-card-hover">
                  <IconBadge name={item.icon} size="md" />
                  <h3 className="mt-5 font-display text-lg leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-0.5 w-10 bg-gold-500 transition-all duration-300 ease-out-soft group-hover:w-16"
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Leadership background ---------- */}
      <section className="pb-16 md:pb-20" aria-labelledby="leadership-heading">
        <div className="container-page">
          <div className="grid gap-8 rounded-2xl bg-lavender-100 p-8 md:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <IconBadge name="shield-check" size="lg" className="size-20" />

            <div>
              <h2 id="leadership-heading" className="font-display text-2xl text-violet-500">
                Leadership Background
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                Mr. Oviedo&rsquo;s unique leadership background sets a tone for the
                organization and its values, which fuels its success. Among many other
                accomplishments, Mr. Oviedo has served as a Federal Law Enforcement Agent,
                as a U.S. Army Special Forces soldier, as the Founder and President of
                several successful business enterprises, and as a community leader
                committed to service.
              </p>
            </div>

            <div className="lg:max-w-[15rem] lg:border-l lg:border-lavender-300 lg:pl-8">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <ShieldCheck className="size-5 text-indigo-600" strokeWidth={1.75} />
                </span>
                <p className="text-[0.8125rem] leading-relaxed text-body">
                  Learn more about our founder&rsquo;s journey and leadership.
                </p>
              </div>
              <Button href="/about/leadership" size="md" className="mt-5 w-full">
                View Leadership Story
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Impact stats band ---------- */}
      <section className="aurora relative overflow-hidden py-12 md:py-14">
        <div className="container-page relative">
          <p className="text-center font-display text-lg text-white sm:text-xl">
            Trusted by individuals, families, organizations, and communities{' '}
            <span className="italic text-gold-400">creating lasting change.</span>
          </p>

          <ul className="mt-9 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {impactStats.map((item, i) => (
              <li
                key={item.title}
                className={
                  i > 0
                    ? 'flex items-center gap-3.5 lg:border-l lg:border-white/15 lg:pl-6'
                    : 'flex items-center gap-3.5'
                }
              >
                <IconBadge name={item.icon} size="md" tone="onDark" />
                <div>
                  {'stat' in item && item.stat && (
                    <p className="font-display text-xl leading-none text-white">
                      {item.stat}
                    </p>
                  )}
                  <p className="mt-1 text-[0.8125rem] leading-snug text-white/80">
                    {item.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        tone="light"
        title="Ready to Lead with Purpose and"
        accent="Create Real Impact?"
        body={`Let's connect and explore how ${site.name} can support your growth, your team, and your community.`}
      />
    </>
  )
}
