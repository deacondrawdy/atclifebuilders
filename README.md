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

Railway builds from the **Dockerfile** (multi-stage, Next standalone output).
`railway.json` pins that and a healthcheck on `/`.

1. `railway init` (or link an existing project)
2. Add a **Postgres** service — Railway injects `DATABASE_URL` automatically
3. Set these variables on the app service:
   - `PAYLOAD_SECRET` — 32-byte hex, **not** the local one
   - `NEXT_PUBLIC_SERVER_URL` — the public URL
4. `railway up`

The Dockerfile sets throwaway `PAYLOAD_SECRET` / `DATABASE_URL` values for the
build stage only. Payload constructs its config at build time but never
connects, and Railway's runtime variables replace both.

### The deps stage must copy `pnpm-workspace.yaml`

pnpm 11 refuses to run install scripts unless they are approved, and those
approvals live in `pnpm-workspace.yaml` (`allowBuilds`). Without that file the
install exits 1 with `ERR_PNPM_IGNORED_BUILDS` and the build dies before it
ever reaches `next build`. sharp is useless without its install script anyway.

If you rewrite the Dockerfile, keep that file in the `COPY` on the deps stage.

### `libc6-compat` is needed in *two* stages

`deps` and `runner` both start `FROM base`, so the runner does not inherit
anything installed in deps. sharp needs the compat layer at runtime as well as
install time — omit it in `runner` and image optimisation fails only in
production.

### `pnpm start` warns locally — that's expected

`output: 'standalone'` is set for the container build, and `next start` prints
"does not work with output: standalone". It does in fact serve correctly (all
routes and the image optimiser included); the warning is cosmetic. The
container runs `node server.js` from the standalone output instead.

### Railway has an ephemeral filesystem

Anything written to disk is wiped on every redeploy. Payload media uploads and
digital product files **must not** live on the container. Configure
`@payloadcms/storage-s3` against Cloudflare R2 or S3 before uploading anything
through the admin panel.

This is the single most common way this setup breaks — and it breaks silently,
about a week after launch, when the first redeploy erases every uploaded image.

### Hero photo vs floating cards — don't pin them to different boxes

The homepage and services heroes float cards over a photo of the founder. The
photo layer is anchored to the **content container**, not the viewport, and
that is deliberate.

The cards live in the container's right grid column. When the photo was pinned
to the viewport (`right-0 w-[54%]`) the subject sat at ~0.73 x viewport width
while the cards sat at ~0.5 x viewport + 280px. The two converge as the window
widens, and by 1920px the cards covered the founder's face entirely.

Anchoring both to the same box makes the offset between them constant at every
width. Two supporting details:

- `public/brand/founder-hero.jpg` is deliberately **left-weighted**, with
  blurred depth extended on the right, so the cards overlay background rather
  than the subject. Do not swap in a centred portrait — use
  `founder-seated.jpg` for upright card/figure placements instead.
- The photo is hidden below `xl`. Between `lg` and `xl` the grid squeezes the
  text column against the card rail, leaving no clear space for a face.

`tests/e2e/hero-layout.e2e.spec.ts` guards this: it asserts the photo-to-card
offset is identical at 1280px and 1920px, and sweeps every page at both widths
for elements overlapping text.

### If images stop appearing, restart the server

The Next image optimiser can wedge: it keeps serving the original JPEG but
stops responding to the WebP/AVIF variants that browsers actually request. The
page then renders with no photo, and the pending request never resolves.

**A plain `curl` will tell you everything is fine.** Without an `Accept`
header the optimiser returns JPEG from cache in milliseconds, which is not the
path a browser takes. Always health-check with a browser-like header:

```bash
HASH=$(ls .next/static/media/ | grep founder-hero | head -1)
curl -s -o /dev/null -w '%{http_code} %{content_type} %{time_total}s
' --max-time 30   -H 'Accept: image/avif,image/webp,image/*,*/*;q=0.8'   "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F$HASH&w=1080&q=75"
```

Healthy looks like `200 image/webp 0.5s`. A hang means the optimiser is wedged
— restart the server. `sharp` itself is not the problem; it encodes this image
to WebP in ~200ms standalone.

`tests/e2e/hero-layout.e2e.spec.ts` catches this state, because it waits for
the image to actually decode rather than just checking the element exists.

### Replacing an image in `public/` keeps serving the old one

`next/image` caches optimised output in `.next/cache/images/`, keyed by URL —
and browsers cache the response on top of that. Overwriting a file in
`public/` with the *same name* would keep serving the old bytes from both.

**This is why brand imagery is imported statically** via `src/lib/brand.ts`
rather than referenced by path. Static imports make Next fingerprint each file
with a content hash, so replacing an asset changes its URL and no stale copy
can survive. They also supply intrinsic dimensions, so there's no layout shift.

Add new brand images to `src/lib/brand.ts` and import from there. If you do
reference one by string path, remember `rm -rf .next && pnpm build` plus a hard
reload after swapping it. A mismatched `img.naturalWidth`/`naturalHeight`
versus the file on disk is the giveaway that you're seeing a cached copy.

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
- [ ] **Real brand assets.** Everything in `public/brand/` was recovered from
      the mockup PNGs and upscaled — the logo, and all four photographs. The
      hero shot additionally has its right edge synthetically extended. They
      are placeholders. Supply the original vector logo and licensed
      photography. When replacing the hero, keep the subject in the left
      portion of the frame (see the hero/card note above).
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
