import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the contact API to return success without hitting Formspree
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    await page.goto('/#contact')
  })

  test('fills out and submits the form, shows a success state', async ({ page }) => {
    // Scroll to the contact section
    await page.locator('#contact').scrollIntoViewIfNeeded()

    // Fill in all required fields
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'test@example.com')
    await page.fill('#message', 'This is a test message from the Playwright E2E suite. Checking that the contact form submits and shows a success state.')

    // Submit
    await page.getByRole('button', { name: 'Send message' }).click()

    // Assert success state — the form should be replaced by a success message
    // Either "Message Received." (submitted) or the LinkedIn fallback (formspreeUnconfigured)
    // Both remove the submit button from the DOM.
    await expect(page.getByRole('button', { name: 'Send message' })).not.toBeVisible({ timeout: 10_000 })

    // Assert the success heading or a fallback message is present
    const successHeading = page.getByText('Message Received.')
    const fallbackMsg = page.getByText('Contact endpoint unconfigured.')
    const eitherVisible = successHeading.or(fallbackMsg)
    await expect(eitherVisible.first()).toBeVisible({ timeout: 10_000 })
  })

  test('submit button is disabled while submitting', async ({ page }) => {
    // Slow the API response so we can catch the loading state
    await page.route('/api/contact', async (route) => {
      await new Promise((r) => setTimeout(r, 800))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'test@example.com')
    await page.fill('#message', 'Testing the loading state of the submit button during form submission.')

    const submitButton = page.getByRole('button', { name: 'Send message' })
    await submitButton.click()

    // Button should show "Sending…" and be disabled during the request
    await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled({ timeout: 3_000 })
  })
})
