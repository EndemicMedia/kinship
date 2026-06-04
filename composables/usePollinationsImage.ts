import { applyStyle } from './prompts'

interface ImageOptions {
  width?: number
  height?: number
  model?: string
  seed?: number
  nologo?: boolean
}

const GEN_BASE_URL = 'https://gen.pollinations.ai/image/'
const PUBLIC_BASE_URL = 'https://image.pollinations.ai/prompt/'
const POLLINATIONS_API_KEY = 'pk_9sbL41ofRXSoaOC2'
const DEFAULT_MODEL = 'gpt-image-2'

// Module-level singleton: probe gen endpoint once per session
let endpointProbe: Promise<boolean> | null = null

async function probeGenEndpoint(): Promise<boolean> {
  if (!endpointProbe) {
    endpointProbe = fetch(
      `${GEN_BASE_URL}${encodeURIComponent('test')}?key=${POLLINATIONS_API_KEY}&model=${DEFAULT_MODEL}&width=32&height=32`,
      { method: 'HEAD' }
    )
      .then(res => {
        console.log(`[pollinations] gen probe → ${res.status} — using ${res.ok ? 'gen (paid)' : 'public (free)'}`)
        return res.ok
      })
      .catch(() => {
        console.log('[pollinations] gen probe failed — using public (free)')
        return false
      })
  }
  return endpointProbe
}

export function buildPollinationsUrl(prompt: string, options: ImageOptions = {}, useGen = false): string {
  const styledPrompt = applyStyle(prompt, 'base')
  const params = new URLSearchParams({
    model: options.model || DEFAULT_MODEL,
    nologo: 'true',
    ...(options.width ? { width: String(options.width) } : {}),
    ...(options.height ? { height: String(options.height) } : {}),
    ...(options.seed !== undefined ? { seed: String(options.seed) } : {}),
    ...(useGen ? { key: POLLINATIONS_API_KEY } : {}),
  })
  const base = useGen ? GEN_BASE_URL : PUBLIC_BASE_URL
  return `${base}${encodeURIComponent(styledPrompt)}?${params}`
}

export function usePollinationsImage() {
  const resolveUrl = async (prompt: string, options: ImageOptions = {}): Promise<string> => {
    const useGen = await probeGenEndpoint()
    return buildPollinationsUrl(prompt, options, useGen)
  }

  return { resolveUrl, buildPollinationsUrl }
}
