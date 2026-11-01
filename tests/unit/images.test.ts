import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { validateImage, validateRequiredImages } from '../../scripts/validate-images.mjs'

test('all required static showcase images have complete JPEG structure', async () => {
  await validateRequiredImages()
  const dimensions = validateImage(await readFile('public/images/hero.jpg'))
  assert.ok(dimensions.width >= 64 && dimensions.height >= 64)
})

test('image validation rejects non-images, truncated scans, and trailing garbage', async () => {
  const image = await readFile('public/images/hero.jpg')
  assert.throws(() => validateImage(Buffer.from('<html>provider unavailable</html>')))
  assert.throws(() => validateImage(image.subarray(0, image.length - 2)))
  assert.throws(() => validateImage(Buffer.concat([image, Buffer.from('garbage')])))
})
