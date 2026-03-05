import { test, expect } from '@playwright/test';

test.describe('Navigation & Critical Paths', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should load the homepage and show the hero section', async ({ page }) => {
        const heroTitle = page.locator('h1')
        await expect(heroTitle).toBeVisible()
        await expect(heroTitle).toContainText(/Olabode Olusegun/i)
    })

    test('should navigate to ServiceBridge case study and verify architecture diagram', async ({ page }) => {
        // Find the ServiceBridge card
        const card = page.locator('a[href="/case-studies/servicebridge"]')
        await card.click()

        // Wait for title and check for diagram
        await expect(page).toHaveURL(/.*servicebridge/)
        await expect(page.locator('h1')).toContainText('ServiceBridge')

        // Wait for system design diagram
        const diagram = page.locator('svg').first()
        await expect(diagram).toBeVisible()
    })

    test('should verify responsive accessibility of the mobile menu', async ({ page, isMobile }) => {
        if (!isMobile) return;

        // Mobile menu button
        const menuBtn = page.locator('button[aria-label="Toggle menu"]')
        await expect(menuBtn).toBeVisible()

        await menuBtn.click()
        const navLinks = page.locator('nav').first()
        await expect(navLinks).toBeVisible()
    })
})
