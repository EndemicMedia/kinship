/**
 * Explicitly refreshes missing or invalid landing images from Pollinations.
 * Run with: node scripts/generate-images.mjs
 * Saves images to public/images/ so they are served as static assets.
 *
 * Set POLLINATIONS_API_KEY env var to use the paid gen endpoint.
 * Routine builds use validated committed assets and never invoke providers.
 */

import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { MAX_IMAGE_BYTES, REQUIRED_IMAGE_NAMES, validateImage, validateRequiredImages } from './validate-images.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images')

const GEN_BASE = 'https://gen.pollinations.ai/image/'
const API_KEY = process.env.POLLINATIONS_API_KEY || ''

// Model fallback order — evaluated by quality, highest first.
// flux and kontext return 403 with sk_ keys (require different auth).
const MODELS = ['gptimage-large', 'gptimage']
const REQUEST_TIMEOUT_MS = 30_000
const RUN_TIMEOUT_MS = 180_000

// Base style injected into every prompt
const BASE_STYLE = 'Professional lifestyle photography, diverse multi-generational crews, platonic collaborative energy, warm natural lighting, documentary-style candid moments, ages ranging from 20s to 70s, mixed genders and ethnicities, genuine connections not romantic, warm beige and navy blue color palette, editorial photography quality'

function applyStyle(prompt) {
  return `${BASE_STYLE}, ${prompt}`
}

// All landing page images keyed by output filename
const images = {
  hero: {
    prompt: "Close-up intimate shot of diverse crew of 4 adults, one in 20s, two in 30s, one in 60s, mixed genders and ethnicities, gathered around large wooden table with 2 children ages 4 and 7 drawing and playing, all adults fully focused on children, warm sunlight through large windows, authentic loving expressions, hands pointing at children's artwork, children at center of attention, warm beige walls with navy accents",
    width: 1024, height: 600,
  },
  problem: {
    prompt: 'Modern abstract editorial illustration showing three tangled chains representing romantic desire, lifelong partnership, and legal enforcement, twisted together and breaking apart, chaotic fragmented composition, stressed color palette with muted reds and grays, minimalist flat vector design style',
    width: 768, height: 768,
  },
  solution: {
    prompt: 'Modern abstract editorial illustration showing three separate clear pathways flowing harmoniously side by side, organized composition with gentle curves, calming color palette with teals, warm beiges, and navy blues, minimalist flat vector design, optimistic uplifting mood',
    width: 768, height: 768,
  },
  compass: {
    prompt: 'Over-shoulder shot of person in 30s using tablet showing a crew matching interface with profile cards and compatibility visualization on screen, sitting in comfortable modern home office, warm natural lighting',
    width: 1024, height: 600,
  },
  testimonial1: {
    prompt: 'Close-up portrait of single person in mid-30s with genuine warm confident smile, sitting near window with soft natural side lighting, neutral warm home background with deep bokeh blur, editorial lifestyle portrait',
    width: 200, height: 200,
  },
  testimonial2: {
    prompt: 'Group portrait of three diverse individuals mixed ages 30s to 40s, genders, and ethnicities, in casual formation, friendly crew dynamic, warm modern home interior background softly blurred, natural window lighting, genuine warm smiles',
    width: 200, height: 200,
  },
  testimonial3: {
    prompt: 'Intimate shot of grandmother in late 60s with two children ages 4 and 7 on outdoor steps, children cuddled close showing secure attachment, warm golden hour lighting, grandmother fully focused on children with loving expression',
    width: 200, height: 200,
  },
  cta: {
    prompt: 'Cinematic wide shot of diverse group of 5 adults and 2 children walking together toward sunset horizon, children running ahead playfully, warm golden backlight, multi-generational crew on journey together, hopeful joyful atmosphere',
    width: 1024, height: 400,
  },
  'how-discover': {
    prompt: 'Two diverse people meeting at a bright coffee shop for the first time, friendly conversation, warm natural light, genuine curiosity and openness, platonic friendly energy',
    width: 400, height: 500,
  },
  'how-align': {
    prompt: 'Overhead view of diverse hands pointing at planning documents and colorful sticky notes on a table, collaborative brainstorming session, warm daylight',
    width: 400, height: 500,
  },
  'how-formalize': {
    prompt: 'Three diverse crew members signing documents with a professional advisor, modern office setting, confident expressions showing milestone achievement',
    width: 400, height: 500,
  },
  'how-sustain': {
    prompt: 'Multigenerational group of adults and children around an outdoor dinner table at sunset, children laughing between adult conversation, warm golden hour lighting, thriving chosen family',
    width: 400, height: 500,
  },
}

async function tryModel(prompt, width, height, model, deadline) {
  const styled = applyStyle(prompt)
  const params = new URLSearchParams({ model, width: String(width), height: String(height), nologo: 'true', seed: '1' })
  const url = `${GEN_BASE}${encodeURIComponent(styled)}?${params}`
  try {
    const remaining = deadline - Date.now()
    if (remaining <= 0) throw new Error('Generation run deadline exceeded')
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      signal: AbortSignal.timeout(Math.min(REQUEST_TIMEOUT_MS, remaining)),
      redirect: 'error'
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    if (!/^image\/jpeg(?:;|$)/i.test(res.headers.get('content-type') || '')) throw new Error('Response is not a JPEG')
    if (Number(res.headers.get('content-length')) > MAX_IMAGE_BYTES) throw new Error('Response exceeds image size limit')
    const chunks = []
    let size = 0
    for await (const chunk of res.body) {
      size += chunk.length
      if (size > MAX_IMAGE_BYTES) throw new Error('Response exceeds image size limit')
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)
    validateImage(buffer)
    console.log(`    ${model}: validated ${(size / 1024).toFixed(0)} KiB`)
    return buffer
  } catch (e) {
    console.log(`    ${model}: ${e.name === 'TimeoutError' || e.name === 'AbortError' ? 'request timed out' : 'request or image validation failed'}`)
    return null
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const deadline = Date.now() + RUN_TIMEOUT_MS
  for (const name of REQUIRED_IMAGE_NAMES) {
    const { prompt, width, height } = images[name]
    const outPath = path.join(OUTPUT_DIR, `${name}.jpg`)
    try {
      validateImage(await readFile(outPath))
      console.log(`${name}: existing image validated`)
      continue
    } catch (error) {
      if (error.code !== 'ENOENT') console.warn(`${name}: existing image is invalid; regeneration required`)
    }
    if (!API_KEY || Date.now() >= deadline) {
      console.error(`${name}: a valid local image is required; ${API_KEY ? 'run deadline exceeded' : 'set POLLINATIONS_API_KEY to generate it'}`)
      continue
    }

    console.log(`⏳ ${name} (${width}×${height})...`)
    let buffer = null
    for (const model of MODELS) {
      if (Date.now() >= deadline) break
      buffer = await tryModel(prompt, width, height, model, deadline)
      if (buffer) break
    }

    if (!buffer) {
      console.log(`    ❌ all sources failed for ${name}`)
      continue
    }

    const stagingPath = `${outPath}.${process.pid}.partial`
    try {
      await writeFile(stagingPath, buffer, { flag: 'wx' })
      validateImage(await readFile(stagingPath))
      await rename(stagingPath, outPath)
    } finally {
      try {
        await unlink(stagingPath)
      } catch (error) {
        if (error.code !== 'ENOENT') throw error
      }
    }
    console.log(`    💾 saved → public/images/${name}.jpg`)
  }

  await validateRequiredImages(OUTPUT_DIR)
  console.log('\nAll required landing images are valid.')
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}
