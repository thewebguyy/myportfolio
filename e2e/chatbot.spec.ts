import { test, expect } from '@playwright/test'

test.describe('Floating Chatbot', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the chat API so tests work without a live Anthropic key.
    // The client reads via response.body.getReader(), so a plain text body works.
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'I handle rate limiting using a sliding window algorithm with Redis as the backing store, falling back to in-memory for local dev.',
      })
    })

    await page.goto('/')
  })

  test('opens, accepts a message, shows a non-empty response, and clears input', async ({ page }) => {
    // Open the chatbot
    const openButton = page.getByRole('button', { name: 'Open chat assistant' })
    await expect(openButton).toBeVisible()
    await openButton.click()

    // Chat window should appear
    const chatInput = page.getByPlaceholder('Ask about architecture or systems...')
    await expect(chatInput).toBeVisible()

    // Type a message
    const userMessage = 'How do you handle rate limiting?'
    await chatInput.fill(userMessage)
    await expect(chatInput).toHaveValue(userMessage)

    // Submit via Enter key
    await chatInput.press('Enter')

    // Input should clear immediately after submission
    await expect(chatInput).toHaveValue('')

    // User message appears in the thread
    const userBubble = page.locator('.flex.justify-end').filter({ hasText: userMessage })
    await expect(userBubble).toBeVisible()

    // Wait for the assistant response to appear (non-empty, non-error)
    const assistantBubble = page.locator('.flex.justify-start').last()
    await expect(assistantBubble).not.toBeEmpty({ timeout: 15_000 })
    await expect(assistantBubble).not.toContainText('unavailable')
    await expect(assistantBubble).not.toContainText('error')
  })

  test('send button submits the message', async ({ page }) => {
    await page.getByRole('button', { name: 'Open chat assistant' }).click()

    const chatInput = page.getByPlaceholder('Ask about architecture or systems...')
    await chatInput.fill('What is your stack?')

    // Click the send button (contains PaperAirplaneIcon, no text label)
    const sendButton = page.locator('button[disabled]').or(
      page.locator('button').filter({ has: page.locator('svg') }).last()
    )
    // Use a more reliable selector: the button adjacent to the input
    await page.locator('input[placeholder="Ask about architecture or systems..."] + button').click()

    await expect(chatInput).toHaveValue('')

    const assistantResponse = page.locator('.flex.justify-start').last()
    await expect(assistantResponse).not.toBeEmpty({ timeout: 15_000 })
  })
})
