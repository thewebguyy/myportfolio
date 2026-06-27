import { test, expect } from '@playwright/test'

test.describe('Portfolio E2E Tests', () => {
  test('homepage loads and shows primary information', async ({ page }) => {
    await page.goto('/')

    // Assert main title and bio
    await expect(page.getByRole('heading', { name: 'Olabode Olusegun.' })).toBeVisible()
    await expect(page.getByText('I build production systems that stay up.')).toBeVisible()

    // Assert availability status
    await expect(page.getByText('Available for work', { exact: true })).toBeVisible()

    // Assert Outcomes stats
    await expect(page.getByText('double-bookings under concurrent load')).toBeVisible()
    await expect(page.getByText('350 RPS', { exact: true })).toBeVisible()
  })

  test('skip link is accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Press Tab to focus the skip-to-content link
    await page.keyboard.press('Tab')
    const skipLink = page.locator('a:has-text("Skip to content")')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()
  })

  test('can navigate to and view case studies details', async ({ page }) => {
    await page.goto('/')

    // Navigate to Servia case study via projects list link
    const serviaLink = page.locator('a[href="/case-studies/servia"]').first()
    await expect(serviaLink).toBeVisible()
    await serviaLink.click()

    // Verify redirect and content on case study page
    await expect(page).toHaveURL(/\/case-studies\/servia/)
    await expect(page.getByRole('heading', { name: 'Servia', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'The Problem' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Key Decisions' })).toBeVisible()
  })

  test('can view case studies list and navigate back', async ({ page }) => {
    await page.goto('/case-studies')
    
    await expect(page.getByRole('heading', { name: 'Case Studies' })).toBeVisible()
    await expect(page.getByText('Production systems built and shipped')).toBeVisible()

    // Back to home
    const backLink = page.getByRole('link', { name: '← Back to home' })
    await expect(backLink).toBeVisible()
    await backLink.click()
    await expect(page).toHaveURL('/')
  })

  test('can navigate to and view blog articles', async ({ page }) => {
    await page.goto('/blog')

    // Verify blog list loads
    await expect(page.getByRole('heading', { name: 'Long-form.' })).toBeVisible()
    await expect(page.getByText('Why I Rewrote the Matching Layer with WebSockets')).toBeVisible()

    // Click on the article
    await page.getByText('Why I Rewrote the Matching Layer with WebSockets').click()

    // Verify blog post details load
    await expect(page).toHaveURL(/\/blog\/websocket-matching-layer/)
    await expect(page.getByRole('heading', { name: 'Why I Rewrote the Matching Layer with WebSockets' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'The Problem: Stateless Polling at Scale' })).toBeVisible()
  })

  test('verify contact links are present', async ({ page }) => {
    await page.goto('/')

    const emailLink = page.locator('a[href^="mailto:"]').first()
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute('href', 'mailto:olabodemathewolusegun@gmail.com')
  })
})
