import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000/kinship',
    trace: 'on-first-retry',
    screenshot: 'off',
    video: 'off',
    browserName: 'chromium',
  },

  projects: [
    {
      name: 'Mobile Portrait',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
      },
    },
    {
      name: 'Tablet Landscape',
      use: {
        browserName: 'chromium',
        viewport: { width: 1024, height: 768 },
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        isMobile: false,
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/kinship',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
