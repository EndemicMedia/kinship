import { applyStyle } from './prompts'

interface ImageOptions {
  width?: number
  height?: number
  model?: string
  seed?: number
  nologo?: boolean
}

const PUBLIC_BASE_URL = 'https://image.pollinations.ai/prompt/'
const DEFAULT_MODEL = 'flux'

export function buildPollinationsUrl(prompt: string, options: ImageOptions = {}): string {
  const styledPrompt = applyStyle(prompt, 'base')
  const params = new URLSearchParams({
    model: options.model || DEFAULT_MODEL,
    nologo: String(options.nologo ?? true),
    ...(options.width ? { width: String(options.width) } : {}),
    ...(options.height ? { height: String(options.height) } : {}),
    seed: String(options.seed ?? 1),
  })
  return `${PUBLIC_BASE_URL}${encodeURIComponent(styledPrompt)}?${params}`
}

export function buildImageFallback(prompt: string, options: ImageOptions = {}): string {
  const hash = [...prompt].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, options.seed ?? 1)
  const width = Math.min(2048, Math.max(1, options.width || 1024))
  const height = Math.min(2048, Math.max(1, options.height || 768))
  const hue = 165 + hash % 30
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 800 600"><rect width="800" height="600" fill="#f1e9dc"/><circle cx="${200 + hash % 400}" cy="230" r="170" fill="hsl(${hue},35%,72%)"/><path d="M0 470Q220 280 420 450T800 400V600H0Z" fill="#1e3a5f"/><path d="M0 540Q280 390 520 520T800 480V600H0Z" fill="#0f766e"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function usePollinationsImage() {
  const resolveUrl = async (prompt: string, options: ImageOptions = {}): Promise<string> => {
    return buildImageFallback(prompt, options)
  }

  return { resolveUrl, buildPollinationsUrl, buildImageFallback }
}
