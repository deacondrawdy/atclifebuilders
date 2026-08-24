import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

/**
 * These tests seed a real user through Payload, so they need a working,
 * authenticated Postgres connection — not just a port that answers.
 *
 * They are opt-in so `pnpm test:e2e` stays green on a fresh clone before the
 * database is provisioned. Enable once Postgres is up:
 *
 *   RUN_ADMIN_E2E=1 pnpm test:e2e
 *
 * Get a database with `docker compose up -d`, or point DATABASE_URL at the
 * Railway Postgres service.
 */
const RUN_ADMIN_E2E = process.env.RUN_ADMIN_E2E === '1'
test.describe('Admin Panel', () => {
  test.skip(!RUN_ADMIN_E2E, 'Set RUN_ADMIN_E2E=1 with a live Postgres to run these')

  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('http://localhost:3000/admin')
    await expect(page).toHaveURL('http://localhost:3000/admin')
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test('can navigate to list view', async () => {
    await page.goto('http://localhost:3000/admin/collections/users')
    await expect(page).toHaveURL('http://localhost:3000/admin/collections/users')
    const listViewArtifact = page.locator('h1', { hasText: 'Users' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to edit view', async () => {
    await page.goto('http://localhost:3000/admin/collections/users/create')
    await expect(page).toHaveURL(/\/admin\/collections\/users\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="email"]')
    await expect(editViewArtifact).toBeVisible()
  })
})
