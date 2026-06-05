/**
 * Pre-generates all landing page images from Pollinations at build time.
 * Run with: node scripts/generate-images.mjs
 * Saves images to public/images/ so they are served as static assets.
 *
 * Set POLLINATIONS_API_KEY env var to use the paid gen endpoint.
 * Falls back to loremflickr placeholders if all APIs are unreachable.
 */

import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images')

const GEN_BASE = 'https://gen.pollinations.ai/image/'
const API_KEY = process.env.POLLINATIONS_API_KEY || ''

// Model fallback order — evaluated by quality, highest first.
// flux and kontext return 403 with sk_ keys (require different auth).
const MODELS = [
  'gptimage-large',  // GPT Image 1.5 — best quality, diverse scenes, 0.000032 pollens
  'gptimage',        // GPT Image 1 Mini — very good, cheapest at 0.000006 pollens
  'nova-canvas',     // Nova Canvas — solid photorealistic, 0.04 pollens
  'klein',           // FLUX.2 Klein 4B — decent, 0.01 pollens
  'zimage',          // Z-Image Turbo — lower res fallback, 0.002 pollens
]

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

async function tryModel(prompt, width, height, model) {
  const styled = applyStyle(prompt)
  const params = new URLSearchParams({ key: API_KEY, model, width: String(width), height: String(height), nologo: 'true' })
  const url = `${GEN_BASE}${encodeURIComponent(styled)}?${params}`
  try {
    const res = await fetch(url)
    if (res.ok) {
      const buf = await res.clone().arrayBuffer()
      console.log(`    ✅ ${model} (${(buf.byteLength / 1024).toFixed(0)} KB)`)
      return res
    }
    console.log(`    ⚠️  ${model} → HTTP ${res.status}`)
    return null
  } catch (e) {
    console.log(`    ⚠️  ${model} → ${e.message}`)
    return null
  }
}

async function fetchLoremFlickr(name, width, height) {
  const keywords = {
    hero: 'family,children,diverse,parenting',
    problem: 'family,conflict,stress',
    solution: 'family,cooperation,planning',
    compass: 'people,meeting,diverse',
    testimonial1: 'woman,portrait,smile',
    testimonial2: 'friends,group,diverse',
    testimonial3: 'grandmother,children,family',
    cta: 'family,outdoors,walking,children',
    'how-discover': 'people,meeting,coffee',
    'how-align': 'planning,teamwork,table',
    'how-formalize': 'signing,contract,professional',
    'how-sustain': 'family,dinner,gathering',
  }
  const kw = keywords[name] || 'family'
  const idx = Object.keys(keywords).indexOf(name) + 1
  try {
    const res = await fetch(`https://loremflickr.com/${width}/${height}/${kw}?lock=${idx}`)
    return res.ok ? res : null
  } catch {
    return null
  }
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  if (!API_KEY) {
    console.log('⚠️  No POLLINATIONS_API_KEY set — will use loremflickr placeholders\n')
  } else {
    console.log(`✅ API key found — trying gen.pollinations.ai with model order: ${MODELS.join(' → ')}\n`)
  }

  for (const [name, { prompt, width, height }] of Object.entries(images)) {
    const outPath = path.join(OUTPUT_DIR, `${name}.jpg`)
    if (existsSync(outPath)) {
      console.log(`⏭  ${name} — already exists, skipping`)
      continue
    }

    console.log(`⏳ ${name} (${width}×${height})...`)
    let res = null

    if (API_KEY) {
      for (const model of MODELS) {
        res = await tryModel(prompt, width, height, model)
        if (res) break
      }
    }

    if (!res) {
      console.log(`    ↩️  using loremflickr placeholder`)
      res = await fetchLoremFlickr(name, width, height)
    }

    if (!res) {
      console.log(`    ❌ all sources failed for ${name}`)
      continue
    }

    await pipeline(res.body, createWriteStream(outPath))
    console.log(`    💾 saved → public/images/${name}.jpg`)
  }

  console.log('\n✨ Done')
}

main().catch(console.error)
