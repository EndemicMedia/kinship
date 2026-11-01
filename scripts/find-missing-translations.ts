import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const directories = ['pages', 'components', 'layouts', 'composables', 'utils']

function flatten(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [prefix.slice(0, -1)]
  return Object.entries(value).flatMap(([key, child]) => flatten(child, `${prefix}${key}.`))
}

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(file) : /\.(vue|js|ts)$/.test(file) ? [file] : []
  })
}

const english = new Set(flatten(JSON.parse(fs.readFileSync(path.join(root, 'locales/en.json'), 'utf8'))))
const failures: string[] = []
for (const locale of ['de', 'pt-BR']) {
  const keys = new Set(flatten(JSON.parse(fs.readFileSync(path.join(root, `locales/${locale}.json`), 'utf8'))))
  for (const key of english) if (!keys.has(key)) failures.push(`${locale}: missing ${key}`)
}
for (const file of directories.flatMap(directory => walk(path.join(root, directory)))) {
  const content = fs.readFileSync(file, 'utf8')
  const patterns = [
    /(?:^|[^\w])(?:t|\$t)\s*\(\s*(['"`])([\w.\-]+)\1/g,
    /v-t\s*=\s*['"]['"`]([\w.\-]+)['"`]['"]/g,
  ]
  for (const [index, pattern] of patterns.entries()) {
    for (const match of content.matchAll(pattern)) {
      const key = match[index === 0 ? 2 : 1]
      if (!english.has(key)) failures.push(`${path.relative(root, file)}: missing ${key}`)
    }
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'))
  process.exitCode = 1
} else {
  console.log('All literal translation references exist, and locale keys match English.')
}
