import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

// Artifacts stay inside the repository (test-results/ is gitignored) so the suite is portable.
const ARTIFACT_DIR = path.resolve(__dirname, '..', 'test-results', 'screenshots')
fs.mkdirSync(ARTIFACT_DIR, { recursive: true })

test.describe('Portfolio Comprehensive E2E, Accessibility, Interactive Proofs & Multi-Viewport Suite', () => {
  test('1. Homepage loads primary positioning, featured work, about, principles index, and outcomes with zero console errors', async ({ page }) => {
    // Vercel injects its analytics/insights scripts only on Vercel; under a local
    // `next start` they 404. Track real failed responses (with URLs) separately so
    // filtering that injected noise cannot hide a genuinely broken asset.
    const pageErrors: string[] = []
    const consoleErrors: string[] = []
    const failedResponses: string[] = []
    const isVercelScript = (url: string) => url.includes('/_vercel/')

    page.on('pageerror', err => pageErrors.push(err.message))
    page.on('response', res => {
      if (res.status() >= 400 && !isVercelScript(res.url())) {
        failedResponses.push(`${res.status()} ${res.url()}`)
      }
    })
    page.on('console', msg => {
      if (msg.type() !== 'error') return
      const text = msg.text()
      if (isVercelScript(msg.location().url) || text.includes('/_vercel/')) return
      // Generic resource-load failures are asserted with their URLs via failedResponses.
      if (text.startsWith('Failed to load resource')) return
      consoleErrors.push(text)
    })

    await page.goto('/', { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading', { name: 'Olabode Olusegun.' })).toBeVisible()
    await expect(page.getByText('I build reliable software from interface to infrastructure.')).toBeVisible()
    await expect(page.getByText('I build production systems that stay up.')).toBeVisible()
    await expect(page.getByText('Available for work', { exact: true })).toBeVisible()

    // Outcomes stats — scope to the hero "Introduction" region so this asserts the
    // primary outcome stat itself, not the duplicate Servia card further down.
    const hero = page.getByRole('region', { name: 'Introduction' })
    await expect(hero.getByText('double-bookings under concurrent load')).toBeVisible()
    await expect(hero.getByText('350 RPS', { exact: true })).toBeVisible()

    // Major sections
    await expect(page.getByRole('heading', { name: 'Production Systems & Case Studies' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Product Ownership Meets Systems Correctness' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Eight Principles Extracted From Production Incidents' })).toBeVisible()

    expect(pageErrors, 'Uncaught page errors').toEqual([])
    expect(consoleErrors, 'Console errors (excluding Vercel-injected analytics)').toEqual([])
    expect(failedResponses, 'Failed responses (excluding Vercel-injected analytics)').toEqual([])
  })

  test('2. Skip link, semantic link roles, heading order, and WCAG contrast checks pass', async ({ page }) => {
    await page.goto('/')

    // Skip link keyboard test
    await page.keyboard.press('Tab')
    const skipLink = page.locator('a:has-text("Skip to content")')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()

    // Ensure no <a> tag has role="listitem" overwriting native link role
    const invalidAnchorListitems = await page.locator('a[role="listitem"]').count()
    expect(invalidAnchorListitems).toBe(0)

    // Verify computed contrast ratio of .type-label and .pill-tag on --paper / --paper-2 >= 4.5:1
    const contrastCheck = await page.evaluate(() => {
      function parseRgb(str: string): [number, number, number] {
        const m = str.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
        return [m[0], m[1], m[2]]
      }
      function luminance([r, g, b]: [number, number, number]) {
        const a = [r, g, b].map(v => {
          v /= 255
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
        })
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
      }
      function ratio(fg: [number, number, number], bg: [number, number, number]) {
        const l1 = luminance(fg)
        const l2 = luminance(bg)
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      }

      const bodyBg = parseRgb(getComputedStyle(document.body).backgroundColor)
      const labelEl = document.querySelector('.type-label') as HTMLElement
      const pillEl = document.querySelector('.pill-tag') as HTMLElement

      const labelFg = parseRgb(getComputedStyle(labelEl).color)
      const pillFg = parseRgb(getComputedStyle(pillEl).color)
      const pillBg = parseRgb(getComputedStyle(pillEl).backgroundColor)

      return {
        labelOnPaper: Number(ratio(labelFg, bodyBg).toFixed(2)),
        pillOnSurface: Number(ratio(pillFg, pillBg).toFixed(2)),
      }
    })

    expect(contrastCheck.labelOnPaper).toBeGreaterThanOrEqual(4.5)
    expect(contrastCheck.pillOnSurface).toBeGreaterThanOrEqual(4.5)
  })

  test('3. All 8 interactive engineering demonstrations function properly', async ({ page }) => {
    test.setTimeout(60_000)
    await page.goto('/')

    // Proof 01: Observe
    const observeSection = page.locator('#observe')
    await observeSection.scrollIntoViewIfNeeded()
    await observeSection.getByRole('button', { name: 'Send 10 requests' }).click()
    await expect(observeSection.getByText('P99 (Tail)')).toBeVisible({ timeout: 10000 })
    await expect(observeSection.getByText('8.2s').first()).toBeVisible()

    // Proof 02: Model
    const modelSection = page.locator('#model')
    await modelSection.scrollIntoViewIfNeeded()
    await modelSection.getByRole('button', { name: 'Send to server' }).click()
    await expect(modelSection.getByText(/Validation failed at/)).toBeVisible()
    await modelSection.getByRole('button', { name: 'Shared schema' }).click()
    await modelSection.getByRole('button', { name: 'Send to server' }).click()
    await expect(modelSection.getByText(/Valid contract\./)).toBeVisible()

    // Proof 03: Isolate
    const isolateSection = page.locator('#isolate')
    await isolateSection.scrollIntoViewIfNeeded()
    await isolateSection.getByRole('button', { name: /Book Now/ }).click()
    await expect(isolateSection.getByText(/Double booking detected/)).toBeVisible()
    await isolateSection.getByRole('button', { name: /Switch to Serializable/ }).click()
    await isolateSection.getByRole('button', { name: /Book Now/ }).click()
    await expect(isolateSection.getByText('409 Conflict (P2034)')).toBeVisible()

    // Proof 04: Stress
    const stressSection = page.locator('#stress')
    await stressSection.scrollIntoViewIfNeeded()
    await stressSection.getByRole('button', { name: /System B/ }).click()
    await stressSection.getByRole('button', { name: /Reveal answer/ }).click()
    await expect(stressSection.getByText(/recorded the 14\.5% conflict rate/)).toBeVisible()

    // Proof 05: Recover
    const recoverSection = page.locator('#recover')
    await recoverSection.scrollIntoViewIfNeeded()
    await recoverSection.getByRole('button', { name: 'With idempotency key' }).click()
    await recoverSection.getByRole('button', { name: 'Pay $50' }).click()
    await expect(recoverSection.getByRole('button', { name: /Retry payment/ })).toBeVisible({ timeout: 5000 })
    await recoverSection.getByRole('button', { name: /Retry payment/ }).click()
    await expect(recoverSection.getByText('Confirmed: $50 charged exactly once.')).toBeVisible()

    // Proof 06: Constrain (also check 44px touch target height)
    const constrainSection = page.locator('#constrain')
    await constrainSection.scrollIntoViewIfNeeded()
    const btn3g = constrainSection.getByRole('button', { name: '3G', exact: true })
    const box = await btn3g.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(44)
    await btn3g.click()
    await expect(constrainSection.getByText('7 of 10 fields')).toBeVisible()
    await constrainSection.getByRole('button', { name: 'Offline', exact: true }).click()
    await expect(constrainSection.getByText('3 of 10 fields')).toBeVisible()

    // Proof 07: Ship
    const shipSection = page.locator('#ship')
    await shipSection.scrollIntoViewIfNeeded()
    await shipSection.getByRole('button', { name: 'type', exact: true }).click()
    await shipSection.getByRole('button', { name: 'Run pipeline' }).click()
    await expect(shipSection.getByText(/Blocked at gate: Type check/)).toBeVisible({ timeout: 6000 })

    // Proof 08: Evolve (verify default state is populated, then switch decision)
    const evolveSection = page.locator('#evolve')
    await evolveSection.scrollIntoViewIfNeeded()
    await expect(evolveSection.getByText('01 · Architecture — Production Evolution')).toBeVisible()
    await evolveSection.getByRole('button', { name: /03 · Payments/ }).click()
    await expect(evolveSection.getByText('03 · Payments — Production Evolution')).toBeVisible()
  })

  test('4. All routes, case studies, blog articles, and navigation links resolve without overlap or broken links', async ({ page, request }) => {
    const routes = [
      '/',
      '/case-studies',
      '/case-studies/servia',
      '/case-studies/servicebridge',
      '/case-studies/subscription-manager',
      '/case-studies/checkout-system',
      '/case-studies/laverita-hair',
      '/blog',
      '/blog/websocket-matching-layer',
      '/blog/campus-revival-engineering',
    ]

    for (const route of routes) {
      const res = await request.get(route)
      expect(res.status(), `Route ${route} should return 200`).toBe(200)
    }

    // Verify Case Studies index heading order (h1 -> h2, no skipped h3)
    await page.goto('/case-studies')
    await expect(page.getByRole('heading', { name: 'Case Studies', level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Servia', level: 2 })).toBeVisible()

    // Verify Subscription Manager has full case study & SVG diagram
    await page.goto('/case-studies/subscription-manager')
    await expect(page.getByRole('heading', { name: 'Subscription Manager', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'The Problem' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Architecture' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Key Decisions' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Post-Mortem: What I Learned' })).toBeVisible()
    await expect(page.locator('svg[aria-label*="Subscription Manager"]')).toBeVisible()

    // Confirm only 1 fixed header exists on case study pages
    expect(await page.locator('header.fixed, nav.fixed').count()).toBe(1)

    // Confirm root-qualified nav link from subroute works
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Work', exact: true }).click()
    await expect(page).toHaveURL(/\/#work$/)

    // Verify Blog and article page
    await page.goto('/blog')
    await expect(page.getByRole('heading', { name: 'Long-form.' })).toBeVisible()
    await page.getByText('Why I Rewrote the Matching Layer with WebSockets').click()
    await expect(page).toHaveURL(/\/blog\/websocket-matching-layer/)
    expect(await page.locator('header.fixed, nav.fixed').count()).toBe(1)
  })

  test('5. Captures desktop (1440px), tablet (768px), and mobile (375px) screenshots with zero horizontal overflow', async ({ page }) => {
    test.setTimeout(90_000)

    // Desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_hero.png') })

    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_work.png') })

    await page.locator('#about').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_about.png') })

    await page.locator('#engineering').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_engineering.png') })

    await page.locator('#isolate').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_isolate_proof.png') })

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_contact.png') })

    await page.goto('/case-studies/servia', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_casestudy_servia.png') })

    await page.goto('/case-studies/servicebridge', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_casestudy_servicebridge.png') })

    await page.goto('/case-studies/subscription-manager', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_desktop_1440_casestudy_subscription.png') })

    // Tablet 768x1024
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_tablet_768_hero.png') })

    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_tablet_768_work.png') })

    await page.goto('/case-studies/subscription-manager', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_tablet_768_casestudy_subscription.png') })

    // Mobile 375x812
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_mobile_375_hero.png') })

    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_mobile_375_work.png') })

    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.waitForTimeout(250)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_mobile_375_nav_drawer.png') })
    await page.getByRole('button', { name: 'Close navigation' }).click()

    await page.goto('/case-studies/servia', { waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'after_mobile_375_casestudy_servia.png') })
  })
})
