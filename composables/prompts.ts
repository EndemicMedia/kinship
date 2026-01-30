// AI Image Generation Prompts for Kinship
// These prompts are designed to generate warm, inviting images that match the kinship brand aesthetic
// Using a consistent color palette: navy blue primary, warm beige/cream, natural skin tones

// VERSION CONTROL - Style Evolution
export const styleVersions = {
  v1: {
    // Original cartoony/illustration style
    base: 'Modern minimalist digital illustration, soft pastel color palette with teal and indigo accents, warm and inviting atmosphere, clean composition, professional quality, tall aspect ratio poster aesthetic, soft gradients and airy negative space, precise clean lines, inclusive human-centered design, cohesive pastel palette, flat vector artistry, subtle paper grain texture, gentle diffused lighting, elegant typography accents',
    warm: 'warm golden lighting, cozy atmosphere, soft shadows',
    professional: 'corporate professional style, clean lines, sophisticated color grading',
    friendly: 'friendly approachable style, soft rounded shapes, welcoming composition',
    elegant: 'elegant refined aesthetic, subtle gradients, premium feel',
    nurturing: 'nurturing caring atmosphere, gentle colors, supportive mood',
  },

  v2: {
    // Mockup-inspired: Warm, photorealistic, authentic family photography style
    base: 'Professional lifestyle photography, warm natural lighting, authentic candid moments, European real families, genuine emotions and connections, soft focus backgrounds, natural skin tones, warm beige and cream color palette with navy blue accents, cinematic depth of field, natural indoor settings, cozy home environments, professional portrait quality, authentic human interaction, editorial photography style, warm color grading, intimate family moments',
    warm: 'golden hour natural lighting, warm ambient glow, soft window light, cozy intimate atmosphere',
    professional: 'professional family portrait photography, editorial quality, sophisticated natural lighting, clean modern aesthetic',
    friendly: 'approachable candid photography, natural smiles, relaxed postures, warm welcoming energy',
    elegant: 'refined lifestyle photography, sophisticated compositions, premium editorial quality, tasteful color grading',
    nurturing: 'tender family moments, protective gestures, caring interactions, warm supportive atmosphere, gentle natural lighting',
  }
}

// ACTIVE VERSION - Switch between v1 and v2 here
const ACTIVE_STYLE_VERSION = 'v2' as const

export const stylePrefixes = styleVersions[ACTIVE_STYLE_VERSION]

// Section-specific prompts for the landing page
export const sectionPrompts = {
  // Hero section - main family photo
  hero: {
    prompt: 'Family sitting together on comfortable couch, warm natural home lighting, genuine smiles and laughter, casual modern living room, parents and children interacting naturally, professional lifestyle photography, warm beige walls, cozy intimate atmosphere, authentic family bonding moment, natural candid poses, European home setting',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 768,
  },
  
  // Problem/Solution section - stress vs clarity
  problem: {
    prompt: 'Stressed parent looking at scattered paperwork on kitchen table, concerned expression, cluttered disorganized environment, natural indoor lighting, authentic lifestyle photography, documentary style capturing real parenting challenges, muted colors, candid moment',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  solution: {
    prompt: 'Co-parents collaborating peacefully at clean organized table with laptop, warm smiles, calm focused expressions, modern home office, natural window lighting, professional lifestyle photography, warm beige tones with navy accents, harmonious teamwork moment',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  // Product Layers - each layer concept with photorealistic approach
  identity: {
    prompt: 'Person looking at family photos on wall, reflecting on personal identity and heritage, European cultural elements in home decor, natural indoor lighting, thoughtful contemplative moment, lifestyle photography capturing authentic self-discovery',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  values: {
    prompt: 'Two people having meaningful conversation over coffee, warm engaged expressions, hands gesturing in discussion, cozy home setting, natural window lighting, professional lifestyle photography capturing shared values and connection',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  biological: {
    prompt: 'Expectant parents at medical appointment with healthcare provider, warm professional consultation, modern medical office, gentle natural lighting, caring supportive atmosphere, professional medical photography style',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  legal: {
    prompt: 'Professional advisor reviewing documents with co-parents at conference table, warm collaborative atmosphere, modern European office setting, natural lighting, working together on parenting agreement, editorial business photography style',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  support: {
    prompt: 'Support group of parents sitting in circle, warm welcoming atmosphere, community center or home setting, natural lighting, genuine connections and empathy, documentary style capturing authentic support network, European context',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  // How It Works - step photos
  discover: {
    prompt: 'Two people meeting for first time at coffee shop, warm friendly handshake, genuine smiles, modern cafe setting, natural lighting through windows, professional lifestyle photography capturing new connection and discovery',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },

  plan: {
    prompt: 'Co-parents planning together at table with laptop and notebooks, collaborative working session, warm focused expressions, modern home office, natural daylight, editorial photography style capturing planning journey',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },

  secure: {
    prompt: 'Professional meeting with legal advisor, signing documents with confident expressions, modern office setting, warm professional atmosphere, handshake agreement, editorial business photography style',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },

  sustain: {
    prompt: 'Extended co-parenting family gathering over meal, multiple generations together, warm joyful atmosphere, comfortable home dining room, natural lighting, authentic family moment, lifestyle photography capturing ongoing support',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },
  
  // Governance/Legal Support section
  governance: {
    prompt: 'Professional legal team in modern conference room, warm collaborative meeting atmosphere, documents and laptops, natural window lighting, approachable yet professional, corporate lifestyle photography, warm beige and navy color palette, European office environment',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 600,
  },

  // Testimonials - authentic family portraits
  testimonial1: {
    prompt: 'Genuine portrait of couple smiling warmly at camera, natural home setting, soft window lighting, warm beige background, professional lifestyle portrait photography, authentic happy expressions, editorial quality, European home',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },

  testimonial2: {
    prompt: 'Candid portrait of three co-parents together, warm genuine smiles, modern home interior, natural lighting, showing unity and joy, professional lifestyle photography, authentic connections, European setting',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },

  testimonial3: {
    prompt: 'Heartwarming family portrait, two parents embracing child, warm affectionate moment, golden hour natural lighting, home environment, professional lifestyle photography capturing genuine love and connection',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },

  // Call to Action section
  cta: {
    prompt: 'Hopeful family walking toward bright future, warm backlit silhouette, open doorway with natural light streaming through, warm golden and beige tones, cinematic lifestyle photography, inspiring forward movement, new beginnings',
    aspectRatio: 'wide' as const,
    width: 1200,
    height: 500,
  },

  // Brand Assets - Logo and Favicon
  logo: {
    prompt: 'Clean nautical ship logo design, sailing vessel with waves, navy blue and white color scheme, maritime theme symbolizing journey and navigation, professional minimalist vector logo, simple geometric shapes, classic maritime emblem style, centered composition',
    aspectRatio: 'square' as const,
    width: 512,
    height: 512,
  },

  favicon: {
    prompt: 'Minimalist ship icon for favicon, simple nautical vessel silhouette, navy blue on transparent or white background, clean geometric design, recognizable at small sizes, maritime symbol, 16x16 pixel optimized design concept',
    aspectRatio: 'square' as const,
    width: 64,
    height: 64,
  },
}

// Helper function to apply style prefix to any prompt
export const applyStyle = (prompt: string, style: keyof typeof stylePrefixes = 'base'): string => {
  return `${stylePrefixes[style]}, ${prompt}`
}

// Helper to get a random seed for variety
export const getRandomSeed = (): number => Math.floor(Math.random() * 1000000)

// Helper to generate brand asset URLs (logo, favicon) using Pollinations
export const generateBrandAssetUrl = (assetType: 'logo' | 'favicon', options?: { seed?: number }): string => {
  const POLLINATIONS_API_KEY = 'pk_9sbL41ofRXSoaOC2'
  const BASE_IMAGE_URL = 'https://gen.pollinations.ai/image/'

  const asset = sectionPrompts[assetType]
  if (!asset) {
    throw new Error(`Unknown asset type: ${assetType}`)
  }

  // For brand assets, we don't apply the photorealistic base style
  // They need vector/logo-specific styling
  const params = new URLSearchParams({
    key: POLLINATIONS_API_KEY,
    model: 'flux', // Use flux for better logo generation
    width: asset.width.toString(),
    height: asset.height.toString(),
    nologo: 'true',
    ...(options?.seed && { seed: options.seed.toString() }),
  })

  return `${BASE_IMAGE_URL}${encodeURIComponent(asset.prompt)}?${params.toString()}`
}

// Export default prompt sets for easy importing
export default {
  stylePrefixes,
  sectionPrompts,
  applyStyle,
  getRandomSeed,
  generateBrandAssetUrl,
  styleVersions, // Export version control for reference
}
