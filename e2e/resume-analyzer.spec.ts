import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'

const sampleResume = readFileSync(join(__dirname, 'fixtures/sample-resume.txt'), 'utf-8')

const mockAnalysis = {
  matchScore: 82,
  skillGap: 'Low',
  skillGapSeverity: 'None identified',
  alignmentSignals: {
    cultural: 'Strong ownership mindset, open source contributor',
    technical: 'Deep React and Node.js expertise with distributed systems experience',
    strategic: 'Has scaled systems and led architecture decisions',
  },
  collaborationOpportunities: ['Code review', 'System design sessions'],
  developmentPlan: 'Could explore Rust or Go for performance-critical paths',
  reasoning: 'Candidate demonstrates solid full-stack engineering experience with measurable impact.',
  confidenceScore: 85,
  assumptions: ['Resume is accurate', 'Skills are current'],
}

test.describe('Resume Analyzer', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the analyze-resume API to avoid needing a live OpenAI key
    await page.route('/api/analyze-resume', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis: mockAnalysis,
          confidenceScore: mockAnalysis.confidenceScore,
          assumptions: mockAnalysis.assumptions,
          reportId: 'test-report-id',
          metadata: { latency: 420, tokens: 380 },
        }),
      })
    })

    await page.goto('/#ai')
  })

  test('accepts resume text, shows loading state, then shows results', async ({ page }) => {
    await page.locator('#ai').scrollIntoViewIfNeeded()

    // The textarea for resume input
    const textarea = page.locator('#resume-input')
    await expect(textarea).toBeVisible()

    // Paste the fixture resume text
    await textarea.fill(sampleResume)

    // The "Analyze Resume" button should now be enabled (text >= 50 chars)
    const analyzeButton = page.getByRole('button', { name: 'Analyze Resume' })
    await expect(analyzeButton).toBeEnabled()

    // Slow the mock slightly to catch the loading state
    await page.route('/api/analyze-resume', async (route) => {
      await new Promise((r) => setTimeout(r, 300))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis: mockAnalysis,
          confidenceScore: mockAnalysis.confidenceScore,
          assumptions: mockAnalysis.assumptions,
          reportId: 'test-report-id',
          metadata: { latency: 420, tokens: 380 },
        }),
      })
    })

    await analyzeButton.click()

    // Loading state should appear
    await expect(page.getByText('Analyzing resume…')).toBeVisible({ timeout: 5_000 })

    // Results should appear within 30 seconds
    // "Engineering Fit" is the panel title in the results view
    await expect(page.getByText('Engineering Fit')).toBeVisible({ timeout: 30_000 })

    // Results container should have non-empty reasoning
    await expect(page.getByText(mockAnalysis.reasoning)).toBeVisible()

    // No error message should be visible
    const errorMsg = page.locator('[class*="red"]')
    await expect(errorMsg).not.toBeVisible()
  })

  test('analyze button is disabled when input is too short', async ({ page }) => {
    await page.locator('#ai').scrollIntoViewIfNeeded()

    const textarea = page.locator('#resume-input')
    await textarea.fill('too short')

    const analyzeButton = page.getByRole('button', { name: 'Analyze Resume' })
    await expect(analyzeButton).toBeDisabled()
  })

  test('New Analysis button resets to input state', async ({ page }) => {
    await page.locator('#ai').scrollIntoViewIfNeeded()
    await page.locator('#resume-input').fill(sampleResume)
    await page.getByRole('button', { name: 'Analyze Resume' }).click()

    // Wait for results
    await expect(page.getByText('Engineering Fit')).toBeVisible({ timeout: 30_000 })

    // Reset
    await page.getByRole('button', { name: 'New Analysis' }).click()

    // Textarea should be back
    await expect(page.locator('#resume-input')).toBeVisible()
    await expect(page.getByText('Engineering Fit')).not.toBeVisible()
  })
})
