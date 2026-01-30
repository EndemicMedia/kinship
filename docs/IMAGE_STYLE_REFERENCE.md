# Kinship Image Style Reference

## Quick Style Description Summary

### V2 Photorealistic Style (ACTIVE)

**Base Style Keywords:**
> Professional lifestyle photography, warm natural lighting, authentic candid moments, European real families, genuine emotions and connections, soft focus backgrounds, natural skin tones, warm beige and cream color palette with navy blue accents, cinematic depth of field, natural indoor settings, cozy home environments, professional portrait quality, authentic human interaction, editorial photography style, warm color grading, intimate family moments

### Logo Style
> Clean nautical ship logo design, sailing vessel with waves, navy blue and white color scheme, maritime theme symbolizing journey and navigation, professional minimalist vector logo, simple geometric shapes, classic maritime emblem style, centered composition

### Example Section Prompts (v2)

#### Hero Section
**Prompt:** Family sitting together on comfortable couch, warm natural home lighting, genuine smiles and laughter, casual modern living room, parents and children interacting naturally, professional lifestyle photography, warm beige walls, cozy intimate atmosphere, authentic family bonding moment, natural candid poses, European home setting

**Aspect Ratio:** Landscape (1024x768)

#### Testimonial Portrait
**Prompt:** Genuine portrait of couple smiling warmly at camera, natural home setting, soft window lighting, warm beige background, professional lifestyle portrait photography, authentic happy expressions, editorial quality, European home

**Aspect Ratio:** Square (600x600)

#### How It Works: Planning Step
**Prompt:** Co-parents planning together at table with laptop and notebooks, collaborative working session, warm focused expressions, modern home office, natural daylight, editorial photography style capturing planning journey

**Aspect Ratio:** Portrait (600x800)

#### Support Network
**Prompt:** Support group of parents sitting in circle, warm welcoming atmosphere, community center or home setting, natural lighting, genuine connections and empathy, documentary style capturing authentic support network, European context

**Aspect Ratio:** Square (768x768)

## Color Palette

| Color | Usage |
|-------|-------|
| **Navy Blue** | Primary brand color, logo, accents |
| **Warm Beige/Cream** | Backgrounds, walls, neutral base |
| **Natural Skin Tones** | Authentic, unretouched photography |
| **Golden/Amber** | Natural lighting accents, warmth |
| **Soft White** | Highlights, brightness |

## Photography Direction

- **Lighting:** Natural window light, golden hour, soft diffused
- **Depth of Field:** Shallow to medium (cinematic bokeh)
- **Composition:** Rule of thirds, natural framing
- **Subjects:** European families, modern home settings
- **Mood:** Warm, hopeful, authentic, intimate
- **Style:** Editorial lifestyle photography, documentary moments

## Maritime/Nautical Theme (Logo & Brand)

- **Symbol:** Ship sailing on waves
- **Meaning:** Journey, navigation, guidance through parenting waters
- **Style:** Classic maritime emblems, minimal geometric shapes
- **Colors:** Navy blue primary, white accents
- **Application:** Logo, favicon, brand identity elements

## V1 Illustration Style (Preserved for Reference)

**Base Style Keywords:**
> Modern minimalist digital illustration, soft pastel color palette with teal and indigo accents, warm and inviting atmosphere, clean composition, professional quality, tall aspect ratio poster aesthetic, soft gradients and airy negative space, precise clean lines, inclusive human-centered design, cohesive pastel palette, flat vector artistry, subtle paper grain texture, gentle diffused lighting, elegant typography accents

## Switching Between Styles

Edit `composables/prompts.ts` line 28:
```typescript
const ACTIVE_STYLE_VERSION = 'v2' as const  // Change to 'v1' for illustrations
```
