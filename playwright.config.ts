import { defineConfig, devices } from '@playwright/test'

const staticMode = process.env.E2E_STATIC === '1'

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3000/kinship/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    browserName: 'chromium',
  },

  projects: [
    {
      name: 'Mobile Portrait',
      use: { ...devices['iPhone SE'], defaultBrowserType: 'chromium' },
    },
    {
      name: 'Tablet Landscape',
      use: {
        browserName: 'chromium',
        viewport: { width: 1024, height: 768 },
        isMobile: false,
      },
    },
    {
      name: 'Desktop',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'WebKit',
      testMatch: /(?:app|landing-features)\.spec\.ts/,
      use: { ...devices['Desktop Safari'], browserName: 'webkit' },
    },
  ],

  webServer: {
    env: { E2E_TEST: '1' },
    command: staticMode ? 'node scripts/serve-static.mjs' : 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:3000/kinship/',
    reuseExistingServer: false,
    timeout: 120000,
  },
})
