import { ref, computed } from 'vue'
import { applyStyle } from './prompts'

interface ImageOptions {
  width?: number
  height?: number
  model?: string
  seed?: number
  nologo?: boolean
  private?: boolean
  safe?: boolean
  enhance?: boolean
}

interface CachedImage {
  url: string
  blobUrl: string
  timestamp: number
  prompt: string
  options: ImageOptions
}

interface CacheStats {
  hits: number
  misses: number
  totalApiCallsSaved: number
  hitRate: number
}

const GEN_BASE_URL = 'https://gen.pollinations.ai/image/'
const PUBLIC_BASE_URL = 'https://image.pollinations.ai/prompt/'
const POLLINATIONS_API_KEY = 'pk_9sbL41ofRXSoaOC2'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
const MAX_CACHE_SIZE = 50 // Maximum number of cached images
const DEFAULT_MODEL = 'gpt-image-2'

// Fallback models in order of preference
const FALLBACK_MODELS = ['flux-realism', 'flux', 'turbo']

// Module-level singleton: probe gen endpoint once, shared across all instances
let endpointProbe: Promise<boolean> | null = null

async function probeGenEndpoint(): Promise<boolean> {
  if (!endpointProbe) {
    endpointProbe = (async () => {
      try {
        const probe = `${GEN_BASE_URL}${encodeURIComponent('test')}?key=${POLLINATIONS_API_KEY}&model=${DEFAULT_MODEL}&width=32&height=32`
        const res = await fetch(probe, { method: 'HEAD' })
        const ok = res.ok
        console.log(`[usePollinationsImage] Endpoint probe: gen.pollinations.ai → ${res.status} — using ${ok ? 'gen (paid)' : 'image.pollinations.ai (free)'}`)
        return ok
      } catch {
        console.log('[usePollinationsImage] Endpoint probe failed — using image.pollinations.ai (free)')
        return false
      }
    })()
  }
  return endpointProbe
}

// Module-level serial queue for the free endpoint (max 1 concurrent request per IP)
let freeQueueTail: Promise<void> = Promise.resolve()

function enqueueFree<T>(fn: () => Promise<T>): Promise<T> {
  const result = freeQueueTail.then(fn)
  // Advance the tail; swallow errors so the queue never stalls
  freeQueueTail = result.then(() => {}, () => {})
  return result
}

// Global cache statistics for monitoring
const globalCacheStats: CacheStats = {
  hits: 0,
  misses: 0,
  totalApiCallsSaved: 0,
  hitRate: 0
}

export function usePollinationsImage() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // In-memory cache (falls back to localStorage for persistence)
  const imageCache = ref<Map<string, CachedImage>>(new Map())

  // Initialize cache from localStorage on client side
  if (process.client) {
    try {
      console.log('[usePollinationsImage] Initializing cache from localStorage...')
      const stored = localStorage.getItem('pollinations-image-cache')
      if (stored) {
        const parsed = JSON.parse(stored)
        const now = Date.now()
        const expiryDays = CACHE_DURATION / (24 * 60 * 60 * 1000)

        // Filter out expired entries and convert to Map
        const validEntries = Object.entries(parsed).filter(([_, value]: [string, any]) => {
          const isValid = now - value.timestamp < CACHE_DURATION
          if (!isValid) {
            console.log(`[usePollinationsImage] Expired cache entry removed (age: ${Math.round((now - value.timestamp) / (24 * 60 * 60 * 1000))} days)`)
          }
          return isValid
        })

        imageCache.value = new Map(validEntries as [string, CachedImage][])
        console.log(`[usePollinationsImage] Cache initialized: ${imageCache.value.size} valid entries loaded (${Object.keys(parsed).length - validEntries.length} expired entries removed)`)
        console.log(`[usePollinationsImage] Cache duration: ${expiryDays} days | Max size: ${MAX_CACHE_SIZE} entries`)
      } else {
        console.log('[usePollinationsImage] No existing cache found in localStorage')
      }
    } catch (e) {
      console.error('[usePollinationsImage] Failed to load image cache from localStorage:', e)
    }
  }

  // Generate cache key from prompt and options
  const generateCacheKey = (prompt: string, options: ImageOptions): string => {
    const optionsHash = Object.entries(options)
      .filter(([_, value]) => value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    const cacheKey = `${prompt}:${optionsHash}`
    console.log(`[usePollinationsImage] Generated cache key: ${cacheKey.substring(0, 80)}...`)
    return cacheKey
  }

  // Save cache to localStorage
  const persistCache = () => {
    if (process.client) {
      try {
        const cacheObj = Object.fromEntries(imageCache.value)
        localStorage.setItem('pollinations-image-cache', JSON.stringify(cacheObj))
        console.log(`[usePollinationsImage] Cache persisted to localStorage: ${imageCache.value.size} entries`)
      } catch (e) {
        console.error('[usePollinationsImage] Failed to persist image cache:', e)
        if (e instanceof Error && e.name === 'QuotaExceededError') {
          console.warn('[usePollinationsImage] localStorage quota exceeded - consider clearing old cache entries')
        }
      }
    }
  }

  // Clean old cache entries if cache exceeds max size
  const cleanCache = () => {
    if (imageCache.value.size > MAX_CACHE_SIZE) {
      const entries = Array.from(imageCache.value.entries())
      const sorted = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
      const toRemove = sorted.slice(0, entries.length - MAX_CACHE_SIZE)

      console.log(`[usePollinationsImage] Cache size exceeded (${imageCache.value.size}/${MAX_CACHE_SIZE}), removing ${toRemove.length} oldest entries`)

      toRemove.forEach(([key, cached]) => {
        URL.revokeObjectURL(cached.blobUrl)
        imageCache.value.delete(key)
        console.log(`[usePollinationsImage] Removed old cache entry: ${key.substring(0, 50)}...`)
      })

      persistCache()
    }
  }

  // Generate image URL with parameters
  const buildImageUrl = (prompt: string, options: ImageOptions, useGen: boolean): string => {
    const styledPrompt = applyStyle(prompt, 'base')
    console.log(`[usePollinationsImage] Building image URL for styled prompt: "${styledPrompt.substring(0, 80)}..."`)

    const baseParams: Record<string, string> = {
      model: options.model || DEFAULT_MODEL,
      nologo: 'true',
      ...(options.width && { width: options.width.toString() }),
      ...(options.height && { height: options.height.toString() }),
      ...(options.seed !== undefined && { seed: options.seed.toString() }),
      ...(options.safe && { safe: 'true' }),
      ...(options.enhance && { enhance: 'true' }),
    }

    if (useGen) baseParams.key = POLLINATIONS_API_KEY

    const base = useGen ? GEN_BASE_URL : PUBLIC_BASE_URL
    const url = `${base}${encodeURIComponent(styledPrompt)}?${new URLSearchParams(baseParams).toString()}`
    console.log(`[usePollinationsImage] Endpoint: ${useGen ? 'gen (paid)' : 'public (free)'} | URL: ${url.substring(0, 120)}...`)
    return url
  }

  // Try to fetch from a specific model
  const tryFetchModel = async (prompt: string, options: ImageOptions, modelName: string, useGen: boolean): Promise<{ blob: Blob; url: string } | null> => {
    try {
      console.log(`[usePollinationsImage] 🔄 Trying model: ${modelName}`)
      const imageUrl = buildImageUrl(prompt, { ...options, model: modelName }, useGen)

      const response = await fetch(imageUrl, {
        method: 'GET',
      })

      if (!response.ok) {
        console.log(`[usePollinationsImage] ⚠️ Model ${modelName} failed: ${response.status} ${response.statusText}`)
        return null
      }

      const blob = await response.blob()
      console.log(`[usePollinationsImage] ✅ Model ${modelName} succeeded: ${(blob.size / 1024).toFixed(1)} KB`)
      return { blob, url: imageUrl }
    } catch (err) {
      console.log(`[usePollinationsImage] ⚠️ Model ${modelName} error:`, err)
      return null
    }
  }

  // Fetch and cache image with smart fallback
  const fetchImage = async (prompt: string, options: ImageOptions = {}): Promise<string> => {
    const startTime = Date.now()
    const cacheKey = generateCacheKey(prompt, options)
    const now = Date.now()

    console.log(`[usePollinationsImage] fetchImage started for prompt: "${prompt.substring(0, 60)}..."`)
    console.log(`[usePollinationsImage] Options:`, { width: options.width, height: options.height, model: options.model, seed: options.seed, nologo: options.nologo })

    // Check cache first
    const cached = imageCache.value.get(cacheKey)
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      const age = Math.round((now - cached.timestamp) / (60 * 60 * 1000))
      console.log(`[usePollinationsImage] ✅ CACHE HIT! Returning cached image (age: ${age} hours)`)
      globalCacheStats.hits++
      globalCacheStats.totalApiCallsSaved++
      updateGlobalStats()
      return cached.blobUrl
    }

    console.log(`[usePollinationsImage] ❌ CACHE MISS - Fetching from API with fallback...`)
    globalCacheStats.misses++
    updateGlobalStats()

    isLoading.value = true
    error.value = null

    try {
      // Probe the gen endpoint once; all fetches in this session use the result
      const useGen = await probeGenEndpoint()

      // Determine which models to try (skip component-default nanobanana on free endpoint)
      const modelsToTry: string[] = []
      const requestedModel = options.model
      if (requestedModel && requestedModel !== DEFAULT_MODEL && (useGen || requestedModel !== 'nanobanana')) {
        modelsToTry.push(requestedModel)
      }
      modelsToTry.push(DEFAULT_MODEL)
      FALLBACK_MODELS.forEach(model => { if (!modelsToTry.includes(model)) modelsToTry.push(model) })

      console.log(`[usePollinationsImage] 🎯 Will try models in order: ${modelsToTry.join(' → ')}`)

      // Try each model — serialize requests through the queue when using the free endpoint
      let result: { blob: Blob; url: string } | null = null
      let successfulModel = ''

      const runFetch = async () => {
        for (const modelName of modelsToTry) {
          result = await tryFetchModel(prompt, options, modelName, useGen)
          if (result) {
            successfulModel = modelName
            console.log(`[usePollinationsImage] 🏆 Successfully used model: ${modelName}`)
            break
          }
        }
      }

      if (useGen) {
        await runFetch()
      } else {
        await enqueueFree(runFetch)
      }

      if (!result) {
        throw new Error(`All models failed: ${modelsToTry.join(', ')}`)
      }

      const blobUrl = URL.createObjectURL(result.blob)
      console.log(`[usePollinationsImage] 🔗 Blob URL created: ${blobUrl.substring(0, 50)}...`)

      // Revoke old blob URL if updating
      if (cached) {
        URL.revokeObjectURL(cached.blobUrl)
        console.log(`[usePollinationsImage] ♻️ Revoked old blob URL`)
      }

      // Store in cache
      imageCache.value.set(cacheKey, {
        url: result.url,
        blobUrl,
        timestamp: now,
        prompt,
        options,
      })
      console.log(`[usePollinationsImage] 💾 Cached new entry (cache size: ${imageCache.value.size}, model used: ${successfulModel})`)

      cleanCache()
      persistCache()

      const duration = Date.now() - startTime
      console.log(`[usePollinationsImage] ✅ Fetch completed in ${duration}ms using model: ${successfulModel}`)

      return blobUrl
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      error.value = message
      console.error(`[usePollinationsImage] ❌ ERROR: ${message}`)
      console.error(`[usePollinationsImage] Stack:`, err)
      throw err
    } finally {
      isLoading.value = false
      logCacheStats()
    }
  }

  // Update global cache statistics
  const updateGlobalStats = () => {
    const total = globalCacheStats.hits + globalCacheStats.misses
    globalCacheStats.hitRate = total > 0 ? Math.round((globalCacheStats.hits / total) * 100) : 0
  }

  // Log cache statistics
  const logCacheStats = () => {
    console.log(`[usePollinationsImage] 📊 Cache Stats: ${globalCacheStats.hits} hits, ${globalCacheStats.misses} misses (${globalCacheStats.hitRate}% hit rate), ${globalCacheStats.totalApiCallsSaved} API calls saved`)
  }

  // Clear entire cache
  const clearCache = () => {
    console.log(`[usePollinationsImage] 🗑️ Clearing all cache entries (${imageCache.value.size} entries)`)
    imageCache.value.forEach((cached, key) => {
      URL.revokeObjectURL(cached.blobUrl)
      console.log(`[usePollinationsImage] Revoked blob URL for: ${key.substring(0, 50)}...`)
    })
    imageCache.value.clear()

    if (process.client) {
      localStorage.removeItem('pollinations-image-cache')
      console.log('[usePollinationsImage] 🗑️ localStorage cache cleared')
    }

    // Reset global stats
    globalCacheStats.hits = 0
    globalCacheStats.misses = 0
    globalCacheStats.totalApiCallsSaved = 0
    globalCacheStats.hitRate = 0
    console.log('[usePollinationsImage] 📊 Global cache statistics reset')
  }

  // Get cache stats
  const cacheStats = computed(() => ({
    size: imageCache.value.size,
    maxSize: MAX_CACHE_SIZE,
    hits: globalCacheStats.hits,
    misses: globalCacheStats.misses,
    hitRate: globalCacheStats.hitRate,
    totalApiCallsSaved: globalCacheStats.totalApiCallsSaved,
  }))

  // Expose global stats getter
  const getGlobalCacheStats = (): CacheStats => ({ ...globalCacheStats })

  return {
    isLoading,
    error,
    fetchImage,
    clearCache,
    cacheStats,
    getGlobalCacheStats,
    logCacheStats,
  }
}
