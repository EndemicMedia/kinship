# Kinship image assets

Landing images are committed JPEGs in `public/images/`. Rendering, prerendering, and routine CI do not contact an image provider. Neither provider credentials nor image caches belong in browser code.

## Static images

```vue
<AiImageContainer
  prompt="A diverse crew planning together"
  staticSrc="/images/how-align.jpg"
  :width="400"
  :height="500"
  alt="Crew members reviewing their shared plan"
  loading="lazy"
  objectFit="cover"
  shadow="md"
/>
```

Use paths relative to the public directory, without hardcoding the deployment prefix. The component adds Nuxt's configured `app.baseURL`, including on locale routes.

`prompt` is required; `staticSrc` is preferred. `aspectRatio` supports `auto`, `square`, `portrait`, `landscape`, and `wide`; explicit width/height apply to `auto`. Other props are `alt`, `loading` (`lazy` or `eager`), `objectFit`, `rounded`, `shadow`, `class`, `model`, and `seed`. Model is retained for compatibility but does not trigger runtime generation.

If no static path is supplied or a local asset fails, a deterministic inline SVG is rendered. There are no retries, remote fallbacks, fetch probes, timers, localStorage caches, or blob URLs. The same prompt/seed yields the same illustration on server and client. `resolveUrl()` in `usePollinationsImage()` resolves this local fallback immediately. `buildPollinationsUrl()` is an explicit URL-building utility only; it never fetches or includes credentials.

## Validate and generate assets

```sh
node scripts/validate-images.mjs
# Only when intentionally generating missing or invalid assets:
POLLINATIONS_API_KEY=your-private-key node scripts/generate-images.mjs
```

Keep the generation credential in the process environment, not in source or any `VITE_` variable. Do not invoke generation in routine CI.

Validation checks all twelve required JPEGs for size limits, segment boundaries, dimensions, quantization/Huffman tables, scan data, and a complete end marker. This is structural validation, not a full pixel decoder or visual quality review.

Generation skips only valid local files, bounds each provider request (including its response body) to 30 seconds and the run to 180 seconds, and permits at most two model attempts per asset. Downloads must be JPEGs no larger than 15 MiB. Validated bytes are written to a same-directory staging file, checked again, then atomically renamed. Failures leave existing files unchanged, clean staging files, and return nonzero if any required asset remains invalid or missing.

For creative direction, see [the image style reference](../docs/IMAGE_STYLE_REFERENCE.md).
