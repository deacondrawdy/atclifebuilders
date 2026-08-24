import { expect, test } from '@playwright/test'

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

test.describe('Homepage', () => {
  test('renders the hero with branding and both primary CTAs', async ({ page }) => {
    await page.goto(BASE)

    await expect(page).toHaveTitle(/ATC Life Builders/)

    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Clarity. Confidence.')
    await expect(heading).toContainText('Life by Design.')

    await expect(
      page.getByRole('link', { name: /Book a Free Consultation/i }).first(),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Explore Programs/i }).first(),
    ).toBeVisible()
  })

  test('renders every service card', async ({ page }) => {
    await page.goto(BASE)

    // Scope to the services section — "Holistic Life Coaching" also appears as
    // a pillar card in the hero, so an unscoped lookup is ambiguous.
    const section = page.locator('section', { has: page.locator('#services-heading') })

    for (const title of [
      'Holistic Life Coaching',
      'Guest Speaker',
      'Webinars',
      'Business Consulting',
    ]) {
      await expect(
        section.getByRole('heading', { name: title, exact: true }),
      ).toBeVisible()
    }
  })

  test('loads brand imagery without optimiser errors', async ({ page }) => {
    const failed: string[] = []
    page.on('response', (res) => {
      if (res.url().includes('/_next/image') && !res.ok()) {
        failed.push(`${res.status()} ${res.url()}`)
      }
    })

    await page.goto(BASE)
    await page.waitForLoadState('domcontentloaded')

    expect(failed, 'next/image requests must not fail').toEqual([])
  })

  test('every header navigation link resolves', async ({ page }) => {
    await page.goto(BASE)

    for (const path of ['/shop', '/about', '/services', '/contact', '/book']) {
      const res = await page.request.get(`${BASE}${path}`)
      expect(res.status(), `${path} should not 404`).toBe(200)
    }
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(BASE)

    const toggle = page.locator('button[aria-controls="mobile-nav"]')
    const drawer = page.locator('#mobile-nav')

    await expect(drawer).toBeHidden()
    await toggle.click()
    await expect(drawer).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await toggle.click()
    await expect(drawer).toBeHidden()
  })
})
