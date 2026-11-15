import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3124',
    headless: true,
    channel: process.env.PW_CHANNEL || undefined,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: 'npx next start -p 3124 -H 127.0.0.1',
    url: 'http://127.0.0.1:3124',
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
