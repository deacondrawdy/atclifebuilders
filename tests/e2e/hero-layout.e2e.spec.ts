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
  return { bandToCard: Math.round(card.x - band.x), bandLeft: Math.round(band.x) }
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
  })

  test('services: photo and testimonial card keep a constant offset', async ({ page }) => {
    const url = `${BASE}/services`

    await page.setViewportSize({ width: 1280, height: 900 })
    const narrow = await offsets(page, url, 'hero-testimonial')

    await page.setViewportSize({ width: 1920, height: 900 })
    const wide = await offsets(page, url, 'hero-testimonial')

    expect(Math.abs(wide.bandToCard - narrow.bandToCard)).toBeLessThanOrEqual(2)
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
