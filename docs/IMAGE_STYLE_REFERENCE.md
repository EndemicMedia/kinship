# Kinship image style reference

## Active direction

Professional lifestyle photography of diverse, multigenerational crews: ages from the twenties through the seventies, mixed genders and ethnicities, platonic collaboration, warm natural lighting, candid documentary moments, warm beige backgrounds, and navy accents. Children belong at the center of caregiving scenes. Do not imply romance is required or equate a single household model with family.

Prompts in `scripts/generate-images.mjs` define the required static asset set. `composables/prompts.ts` supplies reusable runtime descriptions. Generated imagery and landing testimonial stories are illustrative, not photographs of verified customers or evidence of product ratings.

## Section direction and requested dimensions

| Asset | Direction | Requested size |
| --- | --- | --- |
| hero | Four adults and two children collaborating around a table | 1024 × 600 |
| problem | Tangled chains illustrating conflated obligations | 768 × 768 |
| solution | Three distinct, harmonious paths | 768 × 768 |
| compass | Person reviewing compatibility dimensions on a tablet | 1024 × 600 |
| testimonial1 | Candid portrait of one adult | 200 × 200 |
| testimonial2 | Friendly, diverse three-person crew portrait | 200 × 200 |
| testimonial3 | Grandparent and children outdoors | 200 × 200 |
| cta | Multigenerational group walking toward the sunset | 1024 × 400 |
| how-discover | Friendly first conversation in a coffee shop | 400 × 500 |
| how-align | Collaborative planning documents and notes | 400 × 500 |
| how-formalize | Crew reviewing documents with an advisor | 400 × 500 |
| how-sustain | Adults and children sharing an outdoor meal | 400 × 500 |

Requested dimensions guide generation, not validation of legacy assets. Providers may return different dimensions; the component reserves the intended display geometry and crops with `objectFit="cover"`. Review generated imagery for inclusion, dignity, believable anatomy, and unwanted text before publishing.

## Palette and composition

- Navy: brand anchors, furnishings, and background accents.
- Beige/cream: welcoming neutral interiors.
- Teal: calm, cooperative planning illustrations.
- Natural skin tones: authentic, unretouched photographic direction.
- Golden light: soft windows and outdoor golden-hour scenes.
- Use natural framing, shallow-to-medium depth of field, and genuine collaborative expressions.
- Problem/solution assets may use abstract editorial illustration rather than photography.

## Nautical identity

The ship-and-waves logo represents navigation and shared journeys. Keep its navy-and-white, minimal geometric design separate from lifestyle scenes. Reference the committed logo and favicons rather than generating replacement logos during builds.

## Earlier illustration direction

The earlier style uses minimalist digital illustration, soft pastel teal and indigo, airy negative space, subtle paper grain, and inclusive human-centered composition. `composables/prompts.ts` retains style selection for reference. Switching that selection does not regenerate committed landing photographs.

## Publishing

Use committed assets under `public/images/` with base-relative paths. Offline deterministic SVG fallbacks are intentionally abstract, not substitute customer portraits. See [image asset usage](../composables/README.md) for validation, bounded generation, credentials, and atomic publication.
