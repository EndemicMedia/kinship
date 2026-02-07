import { test, expect, ConsoleMessage } from '@playwright/test'

const consoleErrors: ConsoleMessage[] = []

test.beforeEach(async ({ page }) => {
  consoleErrors.length = 0
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const errorText = msg.text()
      // Ignore rate limiting and non-critical errors
      if (!errorText.includes('429') && !errorText.includes('favicon') && !errorText.includes('ERR_ABORTED')) {
        consoleErrors.push(msg)
      }
    }
  })
})

test.afterEach(async () => {
  expect(consoleErrors).toHaveLength(0)
})

// Helper to perform demo login with proper waits
async function performDemoLogin(page) {
  await page.goto('/app/login')
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(800)

  // Click demo login button and wait for auth to be set
  const demoButton = page.locator('button:has-text("Continue as Demo User")')
  await expect(demoButton).toBeVisible()
  await demoButton.click()

  // Wait for navigation
  await page.waitForURL('**/app', { timeout: 10000 })
  await page.waitForLoadState('domcontentloaded')

  // Wait for localStorage to be set (give the app time to save auth)
  await page.waitForTimeout(1000)

  // Verify we're on the dashboard
  await expect(page.locator('text=Welcome back')).toBeVisible({ timeout: 10000 })
}

// Helper to get page heading (filter out the logo h1 and header h1)
function getPageHeading(page, text) {
  // Use a more specific selector to avoid matching the AppHeader h1
  return page.locator('h1:not(header h1)').filter({ hasText: new RegExp(text, 'i') })
}

test.describe('Landing Page', () => {
  test('loads with all key elements visible', async ({ page }) => {
    test.setTimeout(45000)

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()

    const content = await page.content()
    expect(content).toContain('Open App')
    expect(content).toContain('Try Demo')
  })

  test('Open App CTA navigates to login', async ({ page }) => {
    test.setTimeout(30000)

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(500)

    const openAppLink = page.locator('a:has-text("Open App")').first()
    await expect(openAppLink).toBeVisible()
    await openAppLink.click({ force: true })

    await page.waitForURL('**/app/login', { timeout: 10000 })
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('text=Welcome to Kinship')).toBeVisible()
  })
})

test.describe('Login Page', () => {
  test('shows login form elements', async ({ page }) => {
    await page.goto('/app/login')
    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('text=Welcome to Kinship')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible()
    await expect(page.locator('button:has-text("Continue as Demo User")')).toBeVisible()
  })

  test('demo login works and redirects', async ({ page }) => {
    await performDemoLogin(page)
  })
})

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await performDemoLogin(page)
  })

  test('displays welcome message and crews', async ({ page }) => {
    await expect(page.locator('text=Welcome back')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Your Crews', exact: true })).toBeVisible()
    await expect(page.locator('.cursor-pointer').first()).toBeVisible()
  })

  test('navigation works', async ({ page }) => {
    // Test navigation adapts to viewport - desktop shows sidebar, mobile shows bottom nav
    const isMobile = await page.locator('nav').isVisible().catch(() => false)
    const hasSidebar = await page.locator('aside').isVisible().catch(() => false)

    // Verify appropriate navigation is visible
    expect(isMobile || hasSidebar).toBe(true)

    // Navigate to Compass using the visible navigation
    if (isMobile) {
      await page.click('nav >> text=Compass', { force: true })
    } else {
      await page.click('aside >> text=The Compass', { force: true })
    }

    await page.waitForURL('**/app/compass')
    await expect(getPageHeading(page, 'The Compass')).toBeVisible()
  })
})

test.describe('Crews', () => {
  test('crews page loads with auth', async ({ page }) => {
    // Login first
    await performDemoLogin(page)

    // Navigate to crews via the "View Crews" button on dashboard
    await page.click('a:has-text("View Crews")', { force: true })

    // Wait for navigation
    await page.waitForURL('**/app/crews', { timeout: 15000 })
    await page.waitForLoadState('domcontentloaded')

    // Verify crews list loaded
    await expect(getPageHeading(page, 'My Crews')).toBeVisible()
  })

  test('crew detail page loads', async ({ page }) => {
    // Login first
    await performDemoLogin(page)

    // Navigate to crews via the "View Crews" button
    await page.click('a:has-text("View Crews")', { force: true })
    await page.waitForURL('**/app/crews', { timeout: 15000 })
    await page.waitForLoadState('domcontentloaded')

    // Click on first crew
    const crewLink = page.locator('a[href*="/app/crews/detail"]').first()
    await crewLink.click({ force: true })
    await page.waitForURL('**/app/crews/detail**', { timeout: 10000 })
    await page.waitForLoadState('domcontentloaded')

    // Verify detail page loaded (check for tabs)
    await expect(page.getByRole('tab', { name: 'Overview' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Chat' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Documents' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Accountability' })).toBeVisible()

    // Verify content visibility (checks that tabs are actually rendering content)
    await expect(page.locator('text=/^Members \\(\\d+\\)$/')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
  })
})

test.describe('The Compass', () => {
  test.beforeEach(async ({ page }) => {
    await performDemoLogin(page)
  })

  test('matching interface loads and works', async ({ page }) => {
    // Navigate to compass
    const isMobile = await page.locator('nav').isVisible().catch(() => false)
    if (isMobile) {
      await page.click('nav >> text=Compass', { force: true })
    } else {
      await page.click('aside >> text=The Compass', { force: true })
    }
    await page.waitForURL('**/app/compass')
    await page.waitForLoadState('domcontentloaded')

    // Verify interface
    await expect(getPageHeading(page, 'The Compass')).toBeVisible()

    // Check for stats or completion message
    const content = await page.content()
    const hasStats = content.includes('Potential') || content.includes('Liked')
    const hasCompletion = content.includes('caught up')
    expect(hasStats || hasCompletion).toBe(true)

    // Try to interact with buttons
    const likeButton = page.locator('button:has-text("Like")')
    const passButton = page.locator('button:has-text("Pass")')

    if (await likeButton.isVisible().catch(() => false)) {
      await likeButton.click()
    } else if (await passButton.isVisible().catch(() => false)) {
      await passButton.click()
    }
  })
})

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await performDemoLogin(page)
  })

  test('profile displays user info and logout works', async ({ page }) => {
    // Navigate to profile
    const isMobile = await page.locator('nav').isVisible().catch(() => false)
    if (isMobile) {
      await page.click('nav >> text=Profile', { force: true })
    } else {
      await page.click('aside >> text=Profile', { force: true })
    }
    await page.waitForURL('**/app/profile')
    await page.waitForLoadState('domcontentloaded')

    // Verify profile
    await expect(getPageHeading(page, 'Profile')).toBeVisible()
    await expect(page.locator('text=Location:')).toBeVisible()
    await expect(page.locator('text=Switch Persona')).toBeVisible()

    // Test logout
    await page.click('button:has-text("Log Out")')
    await page.waitForURL('**/app/login', { timeout: 10000 })
    await expect(page.locator('text=Welcome to Kinship')).toBeVisible()
  })
})

test.describe('Legal', () => {
  test.beforeEach(async ({ page }) => {
    await performDemoLogin(page)
  })

  test('legal page loads with tabs', async ({ page }) => {
    // Navigate to legal
    const isMobile = await page.locator('nav').isVisible().catch(() => false)
    if (isMobile) {
      await page.click('nav >> text=Legal', { force: true })
    } else {
      await page.click('aside >> text=Legal', { force: true })
    }
    await page.waitForURL('**/app/legal')
    await page.waitForLoadState('domcontentloaded')

    // Verify page
    await expect(getPageHeading(page, 'Legal')).toBeVisible()
    await expect(page.locator('text=My Documents')).toBeVisible()
    await expect(page.locator('text=Templates')).toBeVisible()
  })
})

test.describe('Error Monitoring', () => {
  test('no console errors on critical pages', async ({ page }) => {
    test.setTimeout(60000)

    const pages = ['/', '/app/login']

    for (const url of pages) {
      consoleErrors.length = 0
      await page.goto(url)
      await page.waitForLoadState('domcontentloaded')
      await page.waitForTimeout(1000)
      expect(consoleErrors, `Errors on ${url}`).toHaveLength(0)
    }
  })

  test('no console errors during navigation', async ({ page }) => {
    await performDemoLogin(page)

    consoleErrors.length = 0

    // Navigate through pages using UI navigation
    const isMobile = await page.locator('nav').isVisible().catch(() => false)
    if (isMobile) {
      // Mobile: use direct URL navigation to avoid click issues
      await page.goto('/app/compass')
      await page.waitForLoadState('domcontentloaded')
      await page.goto('/app/crews')
      await page.waitForLoadState('domcontentloaded')
    } else {
      // Desktop: use sidebar navigation
      await page.click('aside >> text=The Compass', { force: true })
      await page.waitForURL('**/app/compass')
      await page.click('aside >> text=Crews', { force: true })
      await page.waitForURL('**/app/crews')
    }

    await page.waitForTimeout(500)
    expect(consoleErrors).toHaveLength(0)
  })
})
