import { test as base, expect, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'

export const test = base.extend<{ browserErrors: string[] }>({
  browserErrors: [async ({ page, baseURL }, use) => {
    const errors: string[] = []
    const origin = new URL(baseURL!).origin
    const image = await readFile('public/images/testimonial1.jpg')
    await page.route('**/*', async route => {
      const request = route.request()
      if (new URL(request.url()).origin !== origin && request.resourceType() === 'image') {
        await route.fulfill({ status: 200, contentType: 'image/jpeg', body: image })
      } else {
        await route.continue()
      }
    })
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (new URL(response.url()).origin !== origin || response.status() < 400) return
      const expectedShell = process.env.E2E_STATIC === '1'
        && response.status() === 404
        && response.request().resourceType() === 'document'
        && /\/kinship\/(?:de\/|pt-BR\/)?app(?:\/|$)/.test(new URL(response.url()).pathname)
      if (!expectedShell) errors.push(`HTTP ${response.status()}: ${response.url()}`)
    })
    page.on('console', message => {
      if (message.type() === 'error') {
        // A Pages deep link legitimately returns the 404 SPA shell.
        if (process.env.E2E_STATIC === '1' && /^Failed to load resource:.*404/.test(message.text())) return
        errors.push(message.text())
      }
    })
    await use(errors)
    expect(errors, 'Browser errors').toEqual([])
  }, { auto: true }],
})

export { expect }

export async function open(page: Page, path: string) {
  await page.goto(path)
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible()
}

export async function login(page: Page) {
  await open(page, './app/login')
  await page.getByRole('button', { name: 'Continue as Demo User' }).click()
  await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible()
  expect(new URL(page.url()).pathname).toBe('/kinship/app')
}

export async function navigate(page: Page, route: string) {
  const links = page.locator(`a[href$="/app/${route}"]:visible`)
  await links.first().click()
  await expect(page).toHaveURL(new RegExp(`/kinship/app/${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?|$)`))
}
