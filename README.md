# ATC Life Builders

Marketing site, storefront, booking, and donations for **ATC (Always Thinking Community) Life Builders, Inc.** — a 501(c)(3) coaching and leadership development nonprofit.

Built so far: the design system, homepage, About, Leadership Background, and Programs & Services. Remaining routes render a placeholder so the site is fully navigable.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack) | Marketing pages prerender static; shop/booking/account need a server |
| Language | TypeScript 5.7 | |
| Styling | Tailwind v4 (CSS-first `@theme`) | Design tokens live in `styles.css`, not a JS config |
| CMS | Payload 3.88 | Runs *inside* this Next app at `/admin`; content lives in the same Postgres |
| Database | Postgres (Railway service) | Already needed for orders and download grants |
| Host | Railway (Nixpacks container) | |
| Icons | lucide-react | |
| Tests | Playwright (e2e), Vitest (integration) | |

### Why Payload rather than a hosted CMS

Self-hosting on Railway means a Postgres service exists regardless — orders,
inventory, and digital-download grants all need one. Payload stores content in
that same database and ships its own admin UI, so there's no second bill and no
external service holding the content.

### Version pinning — read before upgrading

`@payloadcms/next@3.88.0` declares this peer range:

```
next: >=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.6 <17.0.0
```

**Next 15.5.x is excluded.** Do not "upgrade" to the latest Next 15 — it will
break Payload. Stay on 16.x, or check the peer range first.

---

## Getting started

```bash
pnpm install
cp .env.example .env          # then set PAYLOAD_SECRET and DATABASE_URL
docker compose up -d          # local Postgres on :5432
pnpm dev                      # http://localhost:3000
```

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The admin panel is at `/admin`. The first account you create becomes the admin.

> If you already run Postgres locally on 5432, either stop it or point
> `DATABASE_URL` at your existing instance and create an `atc_lifebuilders`
> database.

### Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm test:e2e` | Playwright |
| `pnpm test:int` | Vitest |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after schema changes |

Admin e2e tests are opt-in because they need a real authenticated database:

```bash
RUN_ADMIN_E2E=1 pnpm test:e2e
```

---

## Design system

The palette was sampled pixel-by-pixel from the approved mockups rather than
eyeballed. Tokens live in `src/app/(frontend)/styles.css` under `@theme`.

| Token | Hex | Sampled from |
|---|---|---|
| `--color-ink` | `#12103A` | Serif headlines |
| `--color-navy-900` | `#1C1554` | Header CTA fill |
| `--color-indigo-700` | `#312483` | Hero primary button |
| `--color-indigo-600` | `#3B23A8` | Eyebrow / link text |
| `--color-violet-500` | `#4B3CA9` | Italic accent ("Life by Design") |
| `--color-violet-400` | `#625CAA` | Icon circles |
| `--color-gold-500` | `#D8B35E` | Swoosh, subscribe button |
| `--color-canvas` | `#F7F7FB` | Page background |
| `--color-lavender-100` | `#F0F0F8` | Section bands |

**Type:** Playfair Display (headlines, nav, card titles — including an italic
axis for accent phrases) + Poppins (body and UI).

### Signature classes

- `.accent-phrase` — italic violet display text
- `.swoosh` — the gold underline flourish, drawn as an inline SVG so it scales
  with the text instead of being a fixed-width image
- `.eyebrow` / `.eyebrow-rule` — uppercase label with a gold rule beneath
- `.aurora` — the purple/gold gradient used on dark bands
- `.aurora-light` — soft lavender field for light sections

---

## Structure

```
src/
  app/(frontend)/        Public site
    about/               About + about/leadership
    services/            Listing + [slug] detail
    api/subscribe/       Newsletter endpoint (STUB — see Outstanding work)
    ...                  Remaining routes render <Placeholder>
  app/(payload)/         Payload admin + REST/GraphQL (do not edit by hand)
  collections/           Payload collections (Users, Media)
  components/
    home/                Hero, Services, Community, Newsletter
    services/            ServiceCard, ServiceGrid (client-side filter/sort)
    layout/              Header, Footer, Logo, PageHero, CtaBand, Placeholder
    ui/                  Button, Icon, IconBadge, Eyebrow
  lib/site.ts            Content model — single source of truth
  payload.config.ts
```

`src/lib/site.ts` holds all copy that isn't yet in the CMS, shaped so it can be
lifted into Payload collections without touching the components that read it.

---

## Deploying to Railway

1. `railway init` (or link an existing project)
2. Add a **Postgres** service — Railway injects `DATABASE_URL` automatically
3. Set these variables on the app service:
   - `PAYLOAD_SECRET` — 32-byte hex, **not** the local one
   - `NEXT_PUBLIC_SERVER_URL` — the public URL
4. `railway up`

`railway.json` pins the build/start commands and a healthcheck on `/`.

### Railway has an ephemeral filesystem

Anything written to disk is wiped on every redeploy. Payload media uploads and
digital product files **must not** live on the container. Configure
`@payloadcms/storage-s3` against Cloudflare R2 or S3 before uploading anything
through the admin panel.

This is the single most common way this setup breaks — and it breaks silently,
about a week after launch, when the first redeploy erases every uploaded image.

### Replacing an image in `public/` keeps serving the old one

`next/image` caches optimised output in `.next/cache/images/`, keyed by URL —
and browsers cache the response on top of that. Overwriting a file in
`public/` with the *same name* will keep serving the old bytes from both.

After swapping a brand asset:

```bash
rm -rf .next && pnpm build   # clear the server-side optimiser cache
```

...and hard-reload the browser. If an image looks stale, check
`img.naturalWidth`/`naturalHeight` against the file on disk — a mismatched
aspect ratio is the giveaway.

---

## Outstanding work

### Blocking — needs client input

- [ ] **Conflicting tenure claim.** The About stats band says "5.0+ Years of
      Impact & Service" (ATC6) while the Leadership page says "30+ Years of
      Leadership" (ATC 1, ATC7). The 5.0 looks like the star rating leaking
      into a tenure stat. Both are currently rendered as drawn.

- [ ] **Conflicting business location.** ATC3's footer says Orlando, Florida.
      ATC5's footer says "123 Purpose Way, Inspiration, CA 90210" (placeholder).
      The Contact page and About page both say Tucson / Southern Arizona.
      `src/lib/site.ts` currently uses **Tucson, Arizona**. Confirm.
- [ ] **Founder bio is misattributed.** ATC7 renders Mr. Oviedo's first-person
      biography signed "Danielle R." — who is a client testimonial everywhere
      else. Confirm the correct attribution.
- [ ] **Inconsistent pricing.** Business Consulting is "Contact for pricing" on
      ATC3 but "$250" on ATC8. Currently using $250.
- [ ] **Unverified social proof.** The hero claims "5.0 from 100+ clients" while
      three separate sections say "Reviews coming soon." Do not publish the
      rating until it is substantiated.
- [ ] **Real brand assets.** `public/brand/atc-logo.png` and
      `founder-hero.jpg` were recovered from the mockup PNGs and upscaled.
      They are placeholders. Supply the original vector logo and licensed
      photography.
- [ ] **Client avatars** in the hero are initials-on-gradient placeholders.
      Real client photos need signed releases.

### Phase 2 — integrations

- [ ] **Booking** — Cal.com embed (availability, timezones, reminders, Google
      Calendar sync, Stripe-paid slots)
- [ ] **Shop** — Stripe Checkout + Stripe Tax + shipping rates for physical
      goods; signed expiring URLs from object storage for digital products
- [ ] **Donations** — Donorbox or Givebutter. Do **not** hand-roll Stripe:
      recurring gifts, tax receipts, and year-end letters are solved problems
      and carry real compliance risk for a 501(c)(3).
- [ ] **Newsletter** — `src/app/(frontend)/api/subscribe/route.ts` validates and
      accepts but does not persist or forward. Wire to Mailchimp/Beehiiv/Resend.
- [ ] **Instagram feed** — Basic Display API, cached server-side
- [ ] **Testimonials** — move to a Payload collection, replace the placeholders
- [ ] **Object storage** — `@payloadcms/storage-s3` → R2 (see above)
- [ ] **Site search** and **customer accounts** (deferred; Stripe's customer
      portal plus magic-link downloads covers most of phase 1)

### Before launch

- [ ] Remove `robots: { index: false }` from `src/app/(frontend)/layout.tsx`
- [ ] Replace the placeholder payment marks in `Newsletter.tsx` with the
      provider's approved badge assets
- [ ] Real Privacy Policy and Terms
- [ ] `sitemap.xml`, `robots.txt`, OG images
- [ ] Analytics
