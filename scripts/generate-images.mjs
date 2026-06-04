/**
 * Pre-generates all landing page images from Pollinations at build time.
 * Run with: node scripts/generate-images.mjs
 * Saves images to public/images/ so they are served as static assets.
 */

import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images')

const GEN_BASE = 'https://gen.pollinations.ai/image/'
const PUBLIC_BASE = 'https://image.pollinations.ai/prompt/'
const API_KEY = 'pk_9sbL41ofRXSoaOC2'
const DEFAULT_MODEL = 'gpt-image-2'
const FALLBACK_MODELS = ['flux-realism', 'flux', 'turbo', 'sana']

// Base style (matches applyStyle 'base' from prompts.ts)
const BASE_STYLE = 'Professional lifestyle photography, diverse multi-generational crews, platonic collaborative energy, authentic crew dynamics like bands or startups, warm natural lighting, documentary-style candid moments, ages ranging from 20s to 70s, mixed genders and ethnicities, genuine connections not romantic, side-by-side working positions, contemporary settings, warm beige and navy blue color palette, editorial photography quality, real moments not staged perfection, thriving children in supportive environments'

function applyStyle(prompt) {
  return `${BASE_STYLE}, ${prompt}`
}

// All landing page images keyed by filename
const images = {
  'hero': {
    prompt: "Close-up intimate shot of diverse crew of 4 adults, one person in 20s, two in 30s, one in 60s, mixed genders and ethnicities, gathered around large wooden table with 2 children ages 4 and 7 drawing and playing, all adults fully focused on children and their drawings, warm sunlight through large windows, multigenerational family engaged moment, authentic loving expressions, hands pointing at children's artwork, documentary lifestyle photography, children at center of attention showing thriving family model, warm beige walls with navy accents, plants and toys visible, medium shot composition showing faces and connection, professional editorial quality",
    width: 1024, height: 600,
  },
  'problem': {
    prompt: 'Modern abstract editorial illustration showing three tangled chains or ropes representing romantic desire, lifelong partnership, and legal enforcement, twisted together and breaking apart, chaotic fragmented composition, stressed color palette with muted reds, grays, and dark blues, minimalist flat vector design style, conceptual metaphor for incompatible logics forced together, clean geometric shapes, soft paper grain texture, editorial illustration quality',
    width: 768, height: 768,
  },
  'solution': {
    prompt: 'Modern abstract editorial illustration showing three separate clear pathways or streams flowing harmoniously side by side, organized flowing composition with gentle curves, calming color palette with teals, warm beiges, and navy blues, minimalist flat vector design, conceptual metaphor for unbundled systems working in harmony, clean geometric shapes, soft gradients, optimistic uplifting mood',
    width: 768, height: 768,
  },
  'compass': {
    prompt: 'Over-shoulder shot of person in 30s using tablet showing Kinship interface with crew profile cards and compatibility visualization on screen, sitting in comfortable modern home office, warm natural lighting, professional lifestyle photography showing user experience moment',
    width: 1024, height: 600,
  },
  'testimonial1': {
    prompt: 'Artistic close-up portrait of single person in mid-30s with genuine warm confident smile, sitting near window with soft natural side lighting, neutral warm home background with deep bokeh blur, editorial lifestyle portrait photography, authentic happiness and confidence',
    width: 200, height: 200,
  },
  'testimonial2': {
    prompt: 'Group portrait of three diverse individuals, mixed ages in 30s to 40s, genders, and ethnicities, in casual triangular formation, friendly crew dynamic, warm modern home interior background softly blurred, natural window lighting, genuine warm smiles',
    width: 200, height: 200,
  },
  'testimonial3': {
    prompt: "Close-up intimate shot of grandmother in 68 with two children ages 4 and 7 on outdoor wooden steps, children cuddled close showing secure attachment, warm golden hour lighting, grandmother fully focused on children with loving expression",
    width: 200, height: 200,
  },
  'cta': {
    prompt: 'Cinematic wide shot of diverse group of 5 adults and 2 children walking together toward sunset horizon, children running ahead playfully while adults walk in loose formation, warm golden backlight, multi-generational crew on journey together, hopeful joyful atmosphere',
    width: 1024, height: 400,
  },
  'how-discover': {
    prompt: 'Two diverse people meeting at a coffee shop for the first time, friendly conversation, warm natural light',
    width: 400, height: 500,
  },
  'how-align': {
    prompt: 'Overhead view of hands pointing at planning documents and sticky notes on a table, collaborative session',
    width: 400, height: 500,
  },
  'how-formalize': {
    prompt: 'Three people signing documents with a professional advisor, modern office, confident expressions',
    width: 400, height: 500,
  },
  'how-sustain': {
    prompt: 'Multigenerational group of adults and children around an outdoor dinner table at sunset, joyful gathering',
    width: 400, height: 500,
  },
}

async function probeGen() {
  try {
    const res = await fetch(`${GEN_BASE}${encodeURIComponent('test')}?key=${API_KEY}&model=${DEFAULT_MODEL}&width=32&height=32`, { method: 'HEAD' })
    console.log(`gen.pollinations.ai probe → ${res.status}`)
    return res.ok
  } catch {
    return false
  }
}

async function fetchImage(prompt, width, height, useGen) {
  const styled = applyStyle(prompt)
  const models = [DEFAULT_MODEL, ...FALLBACK_MODELS]
  const base = useGen ? GEN_BASE : PUBLIC_BASE

  for (const model of models) {
    const params = new URLSearchParams({ model, width: String(width), height: String(height), nologo: 'true', ...(useGen ? { key: API_KEY } : {}) })
    const url = `${base}${encodeURIComponent(styled)}?${params}`
    try {
      const res = await fetch(url)
      if (res.ok) {
        console.log(`  ✅ ${model} (${((await res.clone().arrayBuffer()).byteLength / 1024).toFixed(0)} KB)`)
        return res
      }
      console.log(`  ⚠️  ${model} → ${res.status}`)
    } catch (e) {
      console.log(`  ⚠️  ${model} → error: ${e.message}`)
    }
  }
  return null
}

// Keyword-based fallback using loremflickr (contextually relevant)
async function fetchLoremFlickr(name, width, height) {
  const keywords = {
    hero:           'family,children,diverse,parenting',
    problem:        'family,conflict,stress',
    solution:       'family,cooperation,planning',
    compass:        'people,meeting,diverse',
    testimonial1:   'woman,portrait,smile',
    testimonial2:   'friends,group,diverse',
    testimonial3:   'grandmother,children,family',
    cta:            'family,outdoors,walking,children',
    'how-discover': 'people,meeting,coffee',
    'how-align':    'planning,teamwork,table',
    'how-formalize':'signing,contract,professional',
    'how-sustain':  'family,dinner,gathering',
  }
  const kw = keywords[name] || 'family'
  const url = `https://loremflickr.com/${width}/${height}/${kw}?lock=${Object.keys(keywords).indexOf(name) + 1}`
  const res = await fetch(url)
  if (res.ok) return res
  return null
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const useGen = await probeGen()
  const canReachPollinations = useGen || await fetch('https://image.pollinations.ai/prompt/test?model=flux&width=32&height=32', { method: 'HEAD' }).then(r => r.ok).catch(() => false)
  console.log(`Pollinations: ${canReachPollinations ? 'reachable' : 'unreachable'} | Gen paid: ${useGen}`)

  for (const [name, { prompt, width, height }] of Object.entries(images)) {
    const outPath = path.join(OUTPUT_DIR, `${name}.jpg`)
    if (existsSync(outPath)) {
      console.log(`⏭  ${name} — already exists, skipping`)
      continue
    }

    console.log(`⏳ ${name} (${width}×${height})...`)

    let res = null
    if (canReachPollinations) {
      res = await fetchImage(prompt, width, height, useGen)
      if (!useGen && res) await new Promise(r => setTimeout(r, 1500))
    }

    // Fall back to loremflickr for preview purposes if Pollinations unreachable
    if (!res) {
      console.log(`  ↩️  Pollinations unavailable — using loremflickr placeholder`)
      res = await fetchLoremFlickr(name, width, height)
    }

    if (!res) { console.log(`  ❌ all sources failed for ${name}`); continue }

    await pipeline(res.body, createWriteStream(outPath))
    console.log(`  💾 saved → public/images/${name}.jpg`)
  }

  console.log('\n✨ Done')
}

main().catch(console.error)
