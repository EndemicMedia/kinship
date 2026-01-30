# Kinship AI Image Generation System

This directory contains the AI image generation system powered by Pollinations.ai for the Kinship platform.

## Architecture

### Components

- **`usePollinationsImage.ts`** - Core composable for fetching and caching AI-generated images
- **`prompts.ts`** - Pre-defined style prompts and configurations for all sections
- **`AiImageContainer.vue`** - Reusable image component with loading states and error handling

### Features

✅ **Smart Browser Caching** - Images are cached in localStorage for 24 hours to reduce API calls  
✅ **Publishable Key** - Uses client-safe public key with IP-based rate limiting (1 pollen/hour)  
✅ **Automatic Cleanup** - LRU cache eviction when exceeding 50 images  
✅ **Error Handling** - Graceful fallbacks with loading and error states  
✅ **Consistent Styling** - Pre-defined prompts for brand-aligned visuals  

## Usage

### Basic Image Component

```vue
<template>
  <AiImageContainer
    prompt="Modern minimalist illustration of family planning"
    aspectRatio="landscape"
    :rounded="true"
    shadow="lg"
  />
</template>
```

### Using Pre-defined Prompts

```vue
<script setup>
import { sectionPrompts } from '../composables/prompts'
</script>

<template>
  <AiImageContainer
    :prompt="sectionPrompts.hero.prompt"
    :aspectRatio="sectionPrompts.hero.aspectRatio"
    :width="sectionPrompts.hero.width"
    :height="sectionPrompts.hero.height"
  />
</template>
```

### Custom Styling

```vue
<AiImageContainer
  prompt="Your custom prompt here"
  width="800"
  height="600"
  model="flux"
  :nologo="true"
  objectFit="contain"
  class="my-custom-class"
/>
```

## Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prompt` | string | required | The text prompt for image generation |
| `width` | number | 1024 | Image width in pixels |
| `height` | number | 1024 | Image height in pixels |
| `model` | string | 'flux' | AI model (flux, turbo, etc.) |
| `seed` | number | random | Seed for reproducible results |
| `nologo` | boolean | undefined | Remove watermark |
| `aspectRatio` | string | 'auto' | Preset: square, portrait, landscape, wide |
| `alt` | string | 'AI generated image' | Accessibility text |
| `loading` | string | 'lazy' | Loading strategy |
| `objectFit` | string | 'cover' | CSS object-fit |
| `rounded` | boolean | true | Rounded corners |
| `shadow` | string | 'md' | Shadow size: none, sm, md, lg, xl |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
POLLINATIONS_API_KEY=pk_9sbL41ofRXSoaOC2
REFERRER_ID=kinship.app
```

## Cache Management

The composable automatically:
- Stores images as blob URLs in localStorage
- Persists cache across sessions
- Evicts oldest entries when limit reached (50 images)
- Revokes blob URLs to prevent memory leaks

To manually clear cache:
```typescript
const { clearCache } = usePollinationsImage()
clearCache()
```

## Rate Limits

- **Publishable Key**: 1 pollen/hour per IP+key combination
- Caching prevents repeated API calls for same prompts
- Consider implementing request queuing for multiple users

## Available Models

- `flux` (default) - High quality, balanced speed
- `turbo` - Faster generation
- `gptimage` - GPT-based generation
- `kontext` - Context-aware generation
- `seedream` - Creative/dreamlike style
- `nanobanana` - Specialized model

## Troubleshooting

**Images not loading:**
- Check browser console for errors
- Verify API key is set in `.env`
- Check rate limit status (1 pollen/hour per IP)

**Cache issues:**
- Clear browser localStorage: `localStorage.removeItem('pollinations-image-cache')`
- Or use `clearCache()` from composable

**Styling inconsistencies:**
- All prompts should include style prefix: `stylePrefixes.base`
- Use `applyStyle()` helper to ensure consistency
