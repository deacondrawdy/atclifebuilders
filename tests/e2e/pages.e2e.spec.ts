import { expect, test } from '@playwright/test'

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

test.describe('About', () => {
  test('renders mission, vision, and what we do', async ({ page }) => {
    await page.goto(`${BASE}/about`)

    await expect(
      page.getByRole('heading', { name: 'Our Mission', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Our Vision', exact: true }),
    ).toBeVisible()

    const whatWeDo = page.locator('section', {
      has: page.locator('#what-we-do-heading'),
    })
    await expect(whatWeDo.locator('article')).toHaveCount(5)
  })

  test('links through to the leadership story', async ({ page }) => {
    await page.goto(`${BASE}/about`)
    await page.getByRole('link', { name: /View Leadership Story/i }).click()

    await expect(page).toHaveURL(/\/about\/leadership$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Leadership Backed by',
    )
  })
})

test.describe('Leadership', () => {
  test('renders breadcrumb and credential cards', async ({ page }) => {
    await page.goto(`${BASE}/about/leadership`)

    const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' })
    await expect(crumbs.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(crumbs.getByRole('link', { name: 'About' })).toBeVisible()

    await expect(page.locator('#credentials-heading ~ ul > li')).toHaveCount(3)
  })
})

test.describe('Services', () => {
  test('filters by category', async ({ page }) => {
    await page.goto(`${BASE}/services`)

    const cards = page.locator('article h3')
    await expect(cards).toHaveCount(4)

    await page.getByRole('tab', { name: 'Coaching', exact: true }).click()
    await expect(cards).toHaveCount(1)
    await expect(cards.first()).toHaveText('Holistic Life Coaching')

    await page.getByRole('tab', { name: 'Speaking', exact: true }).click()
    await expect(cards).toHaveCount(1)
    await expect(cards.first()).toHaveText('Guest Speaker')

    await page.getByRole('tab', { name: 'All Services' }).click()
    await expect(cards).toHaveCount(4)
  })

  test('sorts by price, pushing "contact for pricing" last', async ({ page }) => {
    await page.goto(`${BASE}/services`)

    await page.selectOption('#service-sort', 'Price: Low to High')

    const titles = await page.locator('article h3').allTextContents()
    expect(titles.slice(0, 2)).toEqual(['Holistic Life Coaching', 'Business Consulting'])
  })

  test('marks the selected tab for assistive tech', async ({ page }) => {
    await page.goto(`${BASE}/services`)

    const events = page.getByRole('tab', { name: 'Events', exact: true })
    await expect(events).toHaveAttribute('aria-selected', 'false')

    await events.click()
    await expect(events).toHaveAttribute('aria-selected', 'true')
  })
})
