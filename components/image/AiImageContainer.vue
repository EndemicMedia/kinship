<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { usePollinationsImage } from '../../composables/usePollinationsImage'

interface Props {
  prompt: string
  width?: number
  height?: number
  model?: string
  seed?: number
  nologo?: boolean
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto'
  alt?: string
  loading?: 'lazy' | 'eager'
  class?: string
  fallbackText?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  rounded?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  debug?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 1024,
  height: 1024,
  model: 'nanobanana', // Default to nanobanana - cheapest and most reliable
  aspectRatio: 'auto',
  alt: 'AI generated image',
  loading: 'lazy',
  fallbackText: 'Failed to load image',
  objectFit: 'cover',
  rounded: true,
  shadow: 'md',
  debug: true,
})

const componentId = ref(`ai-image-${Math.random().toString(36).substr(2, 9)}`)
const mountTime = ref<number>(0)

const { fetchImage, isLoading, error, cacheStats, logCacheStats } = usePollinationsImage()
const imageUrl = ref<string | null>(null)
const isLoaded = ref(false)

const log = (message: string, data?: any) => {
  if (props.debug) {
    const prefix = `[AiImageContainer:${componentId.value}]`
    if (data) {
      console.log(`${prefix} ${message}`, data)
    } else {
      console.log(`${prefix} ${message}`)
    }
  }
}

const dimensions = computed(() => {
  if (props.aspectRatio === 'auto') {
    return { width: props.width, height: props.height }
  }

  const aspectRatios = {
    square: { width: 1024, height: 1024 },
    portrait: { width: 768, height: 1024 },
    landscape: { width: 1024, height: 768 },
    wide: { width: 1200, height: 600 },
  }

  return aspectRatios[props.aspectRatio]
})

const shadowClass = computed(() => {
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }
  return shadows[props.shadow]
})

const roundedClass = computed(() => props.rounded ? 'rounded-xl' : '')

const objectFitClass = computed(() => `object-${props.objectFit}`)

onMounted(async () => {
  mountTime.value = Date.now()
  log('🚀 Component mounted', {
    prompt: props.prompt.substring(0, 60) + '...',
    dimensions: dimensions.value,
    aspectRatio: props.aspectRatio,
    model: props.model,
    seed: props.seed
  })
  log('📊 Current cache stats:', cacheStats.value)

  try {
    log('⏳ Starting image fetch...')
    const fetchStartTime = Date.now()

    imageUrl.value = await fetchImage(props.prompt, {
      width: dimensions.value.width,
      height: dimensions.value.height,
      model: props.model,
      seed: props.seed,
      nologo: props.nologo,
    })

    const fetchDuration = Date.now() - fetchStartTime
    log(`✅ Image fetch completed in ${fetchDuration}ms`, { imageUrl: imageUrl.value?.substring(0, 50) + '...' })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    log('❌ Failed to load AI image', { error: errorMessage })
    console.error('[AiImageContainer] Error details:', e)
    
    // Provide helpful context for API errors
    if (errorMessage.includes('500') || errorMessage.includes('401') || errorMessage.includes('403')) {
      console.warn('[AiImageContainer] ⚠️ API Error detected. Possible causes:')
      console.warn('  - API key may be invalid or expired')
      console.warn('  - API key may have run out of credits (Pollen)')
      console.warn('  - Pollinations service may be experiencing issues')
      console.warn('  - Check https://enter.pollinations.ai for account status')
    }
  }
})

// Watch for imageUrl changes
watch(imageUrl, (newUrl, oldUrl) => {
  if (newUrl && newUrl !== oldUrl) {
    log('🖼️ imageUrl updated', { hasUrl: !!newUrl, url: newUrl?.substring(0, 50) + '...' })
  }
})

// Watch for loading state changes
watch(isLoading, (loading) => {
  log(`⏳ Loading state changed: ${loading ? 'loading' : 'complete'}`)
})

// Watch for error state changes
watch(error, (err) => {
  if (err) {
    log('⚠️ Error state set', err)
  }
})

// Watch for image loaded state
watch(isLoaded, (loaded) => {
  if (loaded) {
    const totalDuration = Date.now() - mountTime.value
    log(`🎉 Image fully loaded and rendered! Total time from mount: ${totalDuration}ms`)
  }
})
</script>

<template>
  <div
    :class="[shadowClass, roundedClass, 'overflow-hidden bg-slate-100 dark:bg-slate-800']"
    class="relative"
  >
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-3">
        <UIcon
          name="i-heroicons-photo"
          class="h-8 w-8 animate-pulse text-slate-400"
        />
        <span class="text-xs text-slate-500">Generating image...</span>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="absolute inset-0 flex items-center justify-center bg-rose-50 dark:bg-rose-950/30"
    >
      <div class="flex flex-col items-center gap-2 text-center p-4">
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="h-8 w-8 text-rose-500"
        />
        <span class="text-xs text-rose-600 dark:text-rose-400">{{ fallbackText }}</span>
      </div>
    </div>

    <!-- Image -->
    <img
      v-else-if="imageUrl"
      :src="imageUrl"
      :alt="alt"
      :loading="loading"
      :class="[objectFitClass, roundedClass, props.class, 'h-full w-full transition-opacity duration-300', { 'opacity-0': !isLoaded, 'opacity-100': isLoaded }]"
      @load="() => { isLoaded = true; log('📸 Image element loaded successfully (native load event)') }"
      @error="() => { log('❌ Image element failed to load (native error event)') }"
    />
  </div>
</template>
