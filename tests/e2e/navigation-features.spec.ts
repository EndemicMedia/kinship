import type { Page } from '@playwright/test'
import { test, expect, login, open } from './fixtures'
import de from '../../locales/de.json' with { type: 'json' }
import pt from '../../locales/pt-BR.json' with { type: 'json' }

const locales = [
  { code: 'de', text: de },
  { code: 'pt-BR', text: pt }
]

async function follow(page: Page, path: string) {
  await page.locator(`a[href="${path}"]:visible`).first().click()
  await expect(page).toHaveURL(new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`))
}

for (const { code, text } of locales) {
  test(`${code} account, search, notifications and logout retain the language`, async ({ page }) => {
    await open(page, `./${code}/app/login`)
    await page.getByRole('button', { name: text.loginPage.demoUser, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app$`))
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.getByRole('button', { name: text.showcase.header.account.replace('{name}', 'Alex Rivera'), exact: true }).click()
    await page.getByRole('menuitem', { name: text.settings.title, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/settings$`))
    await page.getByRole('button', { name: text.settings.backToProfile, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/profile$`))
    await page.getByRole('button', { name: text.profile.settings, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/settings$`))

    await page.keyboard.press('Control+k')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('combobox').fill(text.commandPalette.createNewCrew)
    await page.getByRole('option', { name: new RegExp(text.commandPalette.createNewCrew) }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/crews/create$`))
    await page.getByRole('button', { name: text.showcase.header.notifications.replace('{count}', '2'), exact: true }).click()
    await page.getByRole('menuitem', { name: /New Match Found/ }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/compass$`))
    await expect(page.locator('html')).toHaveAttribute('lang', code)

    await page.getByRole('button', { name: text.showcase.header.account.replace('{name}', 'Alex Rivera'), exact: true }).click()
    await page.getByRole('menuitem', { name: text.showcase.header.logout, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/login$`))
    await page.reload()
    await expect(page.getByRole('heading', { name: text.loginPage.welcomeTitle, exact: true })).toBeVisible()
  })

  test(`${code} crew creation and document links preserve language and crew context`, async ({ page }) => {
    await login(page)
    await open(page, `./${code}/app/crews`)
    const prefix = `/kinship/${code}/app`
    await follow(page, `${prefix}/crews/create`)
    await page.getByRole('textbox', { name: text.showcase.crews.name, exact: true }).fill(`${code} navigation crew`)
    await page.getByRole('textbox', { name: text.showcase.crews.description, exact: true }).fill('Shared responsibilities and care.')
    await page.getByRole('button', { name: text.showcase.crews.create, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${prefix}/crews/detail\\?id=`))
    const crewId = new URL(page.url()).searchParams.get('id')
    expect(crewId).toBeTruthy()
    await page.getByRole('tab', { name: text.crewDetail.tabs.documents, exact: true }).click()
    await page.getByRole('link', { name: text.crewDetail.documents.createDocument, exact: true }).click()
    await expect(page).toHaveURL(`${new URL(page.url()).origin}${prefix}/legal?crewId=${crewId}`)
    await page.locator(`a[href*="${prefix}/crews/detail"][href*="tab=documents"]`).click()
    await expect(page).toHaveURL(new RegExp(`${prefix}/crews/detail\\?id=${crewId}&tab=documents$`))
    await expect(page.getByRole('tab', { name: text.crewDetail.tabs.documents, exact: true })).toHaveAttribute('aria-selected', 'true')
    await follow(page, `${prefix}/crews`)
    await expect(page.locator('html')).toHaveAttribute('lang', code)
  })
}

for (const { code, text } of locales) {
  test(`${code} unauthenticated deep links redirect to localized login`, async ({ page }) => {
    await open(page, `./${code}/app/crews`)
    await expect(page).toHaveURL(new RegExp(`/kinship/${code}/app/login$`))
    await expect(page.getByRole('heading', { name: text.loginPage.welcomeTitle, exact: true })).toBeVisible()
  })
}

test('sidebar collapse and expansion preserve keyboard navigation and logout', async ({ page }) => {
  await login(page)
  const sidebar = page.locator('aside')
  test.skip(!await sidebar.isVisible(), 'Sidebar is only displayed on tablet and desktop.')
  const collapse = sidebar.getByRole('button', { name: 'Collapse sidebar', exact: true })
  await collapse.focus()
  await page.keyboard.press('Enter')
  const expand = sidebar.getByRole('button', { name: 'Expand sidebar', exact: true })
  await expect(expand).toBeVisible()
  await expect(expand).toHaveAttribute('aria-expanded', 'false')
  const profile = sidebar.getByRole('link', { name: 'Profile', exact: true })
  await profile.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/kinship\/app\/profile$/)
  await expand.focus()
  await page.keyboard.press('Enter')
  await expect(collapse).toHaveAttribute('aria-expanded', 'true')
  await collapse.click()
  const logout = sidebar.getByRole('button', { name: 'Log out', exact: true })
  const sidebarBounds = await sidebar.boundingBox()
  const logoutBounds = await logout.boundingBox()
  expect(sidebarBounds).not.toBeNull()
  expect(logoutBounds).not.toBeNull()
  expect(logoutBounds!.x).toBeGreaterThanOrEqual(sidebarBounds!.x)
  expect(logoutBounds!.x + logoutBounds!.width).toBeLessThanOrEqual(sidebarBounds!.x + sidebarBounds!.width)
  await logout.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/kinship\/app\/login$/)
})
