import { test, expect, open } from './fixtures'
import type { Page } from '@playwright/test'

async function assertInformationalDialog(page: Page, name: string) {
  const trigger = page.locator('footer').getByRole('button', { name, exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading')).toBeVisible()
  expect((await dialog.locator('p').innerText()).length).toBeGreaterThan(80)
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
}

test.describe('Landing destinations and accessibility', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('retains features, valid section destinations, and one main landmark', async ({ page }) => {
    await open(page, './')
    await expect(page.getByRole('main')).toHaveCount(1)
    for (const name of ['Mission', 'Features', 'How it works']) {
      await page.locator('header').getByRole('link', { name, exact: true }).click()
      await expect(page).toHaveURL(/#(?:mission|features|how-it-works)$/)
      const hash = new URL(page.url()).hash
      await expect(page.locator(hash)).toBeVisible()
    }
    await page.getByRole('tab', { name: 'The Compass', exact: true }).click()
    await expect(page.getByText('Values and vision come first.', { exact: false })).toBeVisible()
    await page.getByRole('tab', { name: "Who It's For", exact: true }).click()
    await expect(page.locator('#features blockquote')).toBeVisible()
    await page.getByRole('tab', { name: 'The 6 Layers', exact: true }).click()
    await expect(page.locator('#features').getByText('Identity', { exact: true })).toBeVisible()
    const links = page.locator('a[href]')
    for (const link of await links.all()) {
      const href = await link.getAttribute('href')
      expect(href).not.toBe('#')
      if (href?.includes('#')) {
        const destination = new URL(href, page.url())
        if (destination.pathname === new URL(page.url()).pathname) {
          await expect(page.locator(destination.hash)).toHaveCount(1)
        }
      }
    }
  })

  test('company, social, pricing, and legal controls show substantive dialogs', async ({ page }) => {
    await open(page, './')
    for (const name of ['Pricing', 'About', 'Blog', 'Contact', 'Privacy', 'Terms', 'Cookies', 'LinkedIn', 'Twitter', 'Instagram']) {
      await assertInformationalDialog(page, name)
    }
    await page.locator('header').getByRole('button', { name: 'App Store', exact: true }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Mobile access')
    await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click()
  })

  test('localized metadata and logo keep the deployment prefix', async ({ page }) => {
    await open(page, './')
    await page.getByLabel('Language', { exact: true }).selectOption('de')
    await expect(page).toHaveURL(/\/kinship\/de$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://endemicmedia.github.io/kinship/de')
    await expect(page.locator('link[rel="alternate"][hreflang="de-DE"]')).toHaveAttribute('href', 'https://endemicmedia.github.io/kinship/de')
    const logo = page.locator('header a').filter({ has: page.locator('img') })
    await expect(logo).toHaveAttribute('href', '/kinship/de')
    await expect(logo.locator('img')).toHaveAttribute('src', '/kinship/logo.png')
    await logo.click()
    await expect(page).toHaveURL(/\/kinship\/de$/)
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(schema.join('')).not.toContain('aggregateRating')
    await page.getByLabel('Sprache', { exact: true }).selectOption('en')
  })
})

test.describe('Landing mobile disclosure', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('discloses navigation, restores focus on Escape, and closes after routing', async ({ page }) => {
    await open(page, './')
    const toggle = page.getByRole('button', { name: 'Toggle mobile menu', exact: true })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toHaveAttribute('aria-controls', 'landing-mobile-menu')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
    await toggle.click()
    await page.locator('#landing-mobile-menu').getByRole('link', { name: 'Features', exact: true }).click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await page.locator('#landing-mobile-menu').getByRole('link', { name: 'Get started', exact: true }).click()
    await expect(page).toHaveURL(/\/kinship\/app\/login$/)
  })
})
