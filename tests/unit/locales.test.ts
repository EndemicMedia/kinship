import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix.slice(0, -1)]: value }
  assert.ok(value && typeof value === 'object', `Invalid translation at ${prefix}`)
  return Object.assign({}, ...Object.entries(value).map(([key, child]) => flatten(child, `${prefix}${key}.`)))
}

const english = flatten(JSON.parse(readFileSync('locales/en.json', 'utf8')))
for (const locale of ['de', 'pt-BR']) {
  test(`${locale} has every English key and preserves interpolation parameters`, () => {
    const translations = flatten(JSON.parse(readFileSync(`locales/${locale}.json`, 'utf8')))
    for (const [key, value] of Object.entries(english)) {
      assert.ok(translations[key], `Missing ${locale}: ${key}`)
      const parameters = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort()
      assert.deepEqual(parameters(translations[key]), parameters(value), `Parameters differ: ${locale}: ${key}`)
    }
  })
}
