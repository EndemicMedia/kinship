import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const REQUIRED_IMAGE_NAMES = [
  'hero', 'problem', 'solution', 'compass', 'testimonial1', 'testimonial2',
  'testimonial3', 'cta', 'how-discover', 'how-align', 'how-formalize', 'how-sustain'
]
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024
export const IMAGE_DIR = fileURLToPath(new URL('../public/images/', import.meta.url))

// Check segment boundaries and scan termination, not merely a JPEG magic prefix.
export function validateImage(buffer) {
  if (buffer.length < 128 || buffer.length > MAX_IMAGE_BYTES || buffer.readUInt16BE(0) !== 0xffd8) {
    throw new Error('Expected a JPEG between 128 bytes and 15 MiB')
  }
  let offset = 2
  let dimensions = null
  let scans = 0
  let hasQuantization = false
  let hasHuffman = false
  while (offset < buffer.length) {
    if (buffer[offset++] !== 0xff) throw new Error('Invalid JPEG marker')
    while (buffer[offset] === 0xff) offset++
    const marker = buffer[offset++]
    if (marker === 0xd9) {
      if (offset !== buffer.length || !dimensions || !scans || !hasQuantization || !hasHuffman) {
        throw new Error('Incomplete JPEG')
      }
      return dimensions
    }
    if (marker === undefined || marker === 0 || marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) {
      throw new Error('Unexpected JPEG marker')
    }
    if (offset + 2 > buffer.length) throw new Error('Truncated JPEG segment')
    const length = buffer.readUInt16BE(offset)
    if (length < 2 || offset + length > buffer.length) throw new Error('Invalid JPEG segment length')
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      if (length < 8) throw new Error('Invalid JPEG frame')
      const height = buffer.readUInt16BE(offset + 3)
      const width = buffer.readUInt16BE(offset + 5)
      const components = buffer[offset + 7]
      if (width < 64 || height < 64 || width > 8192 || height > 8192 || ![1, 3, 4].includes(components) || length !== 8 + 3 * components) {
        throw new Error('Invalid JPEG dimensions or components')
      }
      dimensions = { width, height }
    }
    if (marker === 0xdb) hasQuantization = true
    if (marker === 0xc4) hasHuffman = true
    offset += length
    if (marker === 0xda) {
      if (!dimensions) throw new Error('JPEG scan without a frame')
      const start = offset
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xff) {
          offset++
        } else if (buffer[offset + 1] === 0 || (buffer[offset + 1] >= 0xd0 && buffer[offset + 1] <= 0xd7)) {
          offset += 2
        } else {
          break
        }
      }
      if (offset === start) throw new Error('Empty JPEG scan')
      scans++
    }
  }
  throw new Error('JPEG has no end marker')
}

export async function validateRequiredImages(directory = IMAGE_DIR) {
  const errors = []
  for (const name of REQUIRED_IMAGE_NAMES) {
    try {
      validateImage(await readFile(path.join(directory, `${name}.jpg`)))
    } catch (error) {
      errors.push(`${name}.jpg: ${error.message}`)
    }
  }
  if (errors.length) throw new Error(errors.join('\n'))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateRequiredImages().then(() => {
    console.log(`Validated ${REQUIRED_IMAGE_NAMES.length} required local JPEGs.`)
  }).catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}
