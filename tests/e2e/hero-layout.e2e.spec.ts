import { expect, test } from '@playwright/test'

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

/**
 * Regression guard for the hero photo drifting under the floating cards.
 *
 * The photo used to be pinned to the viewport (`right-0 w-[54%]`) while the
 * cards sat in the content container. The subject therefore moved at ~0.73vw
 * and the cards at ~0.5vw + 280px, so they converged as the window widened —
 * by 1920px the cards covered the founder's face.
 *
 * Both are now anchored to the same container. The invariant that encodes the
 * fix: the offset between the photo band and the card rail must not change
 * with viewport width. If someone re-pins either one to the viewport, this
 * fails.
 */
async function offsets(page: import('@playwright/test').Page, url: string, cardId: string) {
  // `domcontentloaded`, not the default `load`: the hero image is marked
  // priority, and the first request for a new width makes the image optimiser
  // generate that variant from scratch, which can hold the load event open.
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  const photo = page.getByTestId('hero-photo')
  await photo.waitFor({ state: 'attached' })
  const band = await photo.boundingBox()
  const card = await page.getByTestId(cardId).boundingBox()
  if (!band || !card) throw new Error('hero photo band or card not found')
  return {
    bandToCard: Math.round(card.x - band.x),
    bandLeft: Math.round(band.x),
    // How far down the portrait the cards begin, as a fraction of its height.
    // 1 = the cards start exactly at the portrait's bottom edge.
    cardTopInBand: (card.y - band.y) / band.height,
  }
}

test.describe('Hero photo vs floating cards', () => {
  test('homepage: photo and pillar cards keep a constant offset', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    const narrow = await offsets(page, BASE, 'hero-pillars')

    await page.setViewportSize({ width: 1920, height: 900 })
    const wide = await offsets(page, BASE, 'hero-pillars')

    // Both anchored to the same container -> identical relative geometry.
    expect(Math.abs(wide.bandToCard - narrow.bandToCard)).toBeLessThanOrEqual(2)

    // And the band itself must actually move with the centred container.
    expect(wide.bandLeft).toBeGreaterThan(narrow.bandLeft)

    // The cards sit beneath the portrait. They may tuck into its faded bottom
    // edge, but must never climb up toward the founder's face.
    expect(narrow.cardTopInBand).toBeGreaterThanOrEqual(0.9)
    expect(wide.cardTopInBand).toBeGreaterThanOrEqual(0.9)
  })

  test('homepage: nothing in the copy column crosses into the card column', async ({ page }) => {
    // Guards a real regression: at the default large button padding the CTA
    // pair was wider than the copy column, and "Explore Programs" ran into the
    // first pillar card. The generic overlap sweep missed it because the
    // shared area was under its 25% threshold.
    for (const width of [1280, 1920]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(BASE, { waitUntil: 'domcontentloaded' })
      const cards = await page.getByTestId('hero-pillars').boundingBox()
      if (!cards) throw new Error('hero pillars not found')

      const rightmost = await page.evaluate(() => {
        const heading = document.getElementById('hero-heading')
        const column = heading?.parentElement
        if (!column) return null
        return Math.max(
          ...[...column.querySelectorAll('a, p, h1, li')].map(
            (el) => el.getBoundingClientRect().right,
          ),
        )
      })
      if (rightmost === null) throw new Error('hero copy column not found')

      expect(rightmost, `copy column overflows at ${width}px`).toBeLessThanOrEqual(cards.x - 8)
    }
  })

  test('services: photo and testimonial card keep a constant offset', async ({ page }) => {
    const url = `${BASE}/services`

    await page.setViewportSize({ width: 1280, height: 900 })
    const narrow = await offsets(page, url, 'hero-testimonial')

    await page.setViewportSize({ width: 1920, height: 900 })
    const wide = await offsets(page, url, 'hero-testimonial')

    expect(Math.abs(wide.bandToCard - narrow.bandToCard)).toBeLessThanOrEqual(2)
  })

  test('photo is actually rendered at common desktop widths', async ({ browser }) => {
    // Guards a real regression: while fixing the card overlap the photo was
    // hidden below 1280px, so any narrower window showed a hero with no
    // picture at all — which reads as broken, not as a design choice.
    //
    // Each width gets a fresh context. Resizing one page repeatedly makes
    // next/image re-evaluate srcset and abort the in-flight request
    // (net::ERR_ABORTED), which is harness churn rather than a site fault.
    for (const path of ['/', '/services']) {
      for (const width of [1024, 1280, 1440, 1920]) {
        const context = await browser.newContext({ viewport: { width, height: 900 } })
        const page = await context.newPage()
        try {
          await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })

          const photo = page.getByTestId('hero-photo')
          await expect(photo, `hero photo missing on ${path} at ${width}px`).toBeVisible()

          const img = photo.locator('img')
          await expect
            .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth), {
              message: `hero image never decoded on ${path} at ${width}px`,
              timeout: 20000,
            })
            .toBeGreaterThan(0)
        } finally {
          await context.close()
        }
      }
    }
  })

  test('no element overlaps another element that carries text', async ({ page }) => {
    for (const path of ['/', '/about', '/about/leadership', '/services']) {
      for (const width of [1280, 1920]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })

        const clashes = await page.evaluate(() => {
          const sel = 'article, h1, h2, h3, p, blockquote, figcaption, button'
          const nodes = [...document.querySelectorAll(sel)].filter((el) => {
            const r = el.getBoundingClientRect()
            const cs = getComputedStyle(el)
            if (r.width < 8 || r.height < 8) return false
            if (cs.visibility === 'hidden' || cs.display === 'none') return false
            if (el.closest('[aria-hidden="true"]')) return false
            if (String(el.className).includes('sr-only')) return false
            return (el.textContent || '').trim().length > 0
          })

          const hits: string[] = []
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const A = nodes[i]
              const B = nodes[j]
              if (A.contains(B) || B.contains(A)) continue
              const a = A.getBoundingClientRect()
              const b = B.getBoundingClientRect()
              const w = Math.min(a.right, b.right) - Math.max(a.left, b.left)
              const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
              if (w <= 2 || h <= 2) continue
              const frac = (w * h) / Math.min(a.width * a.height, b.width * b.height)
              if (frac < 0.25 || w * h < 400) continue
              hits.push(`${A.tagName}/${B.tagName}: ${(A.textContent || '').trim().slice(0, 30)}`)
            }
          }
          return hits
        })

        expect(clashes, `overlap on ${path} at ${width}px`).toEqual([])
      }
    }
  })
})
