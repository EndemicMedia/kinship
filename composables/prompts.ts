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
  },

  v3: {
    // Diverse crews model: Multi-generational, platonic crews raising children together
    base: 'Professional lifestyle photography, diverse multi-generational crews, platonic collaborative energy, authentic crew dynamics like bands or startups, warm natural lighting, documentary-style candid moments, ages ranging from 20s to 70s, mixed genders and ethnicities, genuine connections not romantic, side-by-side working positions, contemporary settings, warm beige and navy blue color palette, editorial photography quality, real moments not staged perfection, thriving children in supportive environments',
    warm: 'golden hour natural lighting, warm ambient glow, soft window light, collaborative atmosphere',
    professional: 'editorial lifestyle photography, sophisticated natural lighting, contemporary aesthetic, diverse representation',
    friendly: 'approachable candid photography, genuine smiles, relaxed crew dynamics, welcoming collaborative energy',
    elegant: 'refined lifestyle photography, sophisticated compositions, premium editorial quality, tasteful color grading',
    nurturing: 'multi-generational care moments, platonic supportive interactions, crew collaboration, warm inclusive atmosphere',
    illustration: 'Modern abstract editorial illustration, clean minimalist flat vector design, teal and navy color palette with warm gold accents, conceptual visualization, sophisticated infographic style, soft paper grain texture, professional editorial quality, geometric shapes, subtle gradients',
  }
}

// ACTIVE VERSION - Switch between v1, v2, and v3 here
const ACTIVE_STYLE_VERSION = 'v3' as const

export const stylePrefixes = styleVersions[ACTIVE_STYLE_VERSION]

// Section-specific prompts for the landing page
export const sectionPrompts = {
  // Hero section - main crew photo (full-screen background)
  hero: {
    prompt: 'Close-up intimate shot of diverse crew of 4 adults, one person in 20s, two in 30s, one in 60s, mixed genders and ethnicities, gathered around large wooden table with 2 children ages 4 and 7 drawing and playing, all adults fully focused on children and their drawings, warm sunlight through large windows, multigenerational family engaged moment, authentic loving expressions, hands pointing at children\'s artwork, documentary lifestyle photography, children at center of attention showing thriving family model, warm beige walls with navy accents, plants and toys visible, medium shot composition showing faces and connection, professional editorial quality',
    aspectRatio: 'wide' as const,
    width: 1920,
    height: 800,
  },
  
  // Problem/Solution section - abstract concepts (illustrations)
  problem: {
    prompt: 'Modern abstract editorial illustration showing three tangled chains or ropes representing romantic desire, lifelong partnership, and legal enforcement, twisted together and breaking apart, chaotic fragmented composition, stressed color palette with muted reds, grays, and dark blues, minimalist flat vector design style, conceptual metaphor for incompatible logics forced together, clean geometric shapes, soft paper grain texture, editorial illustration quality, sophisticated adult aesthetic, crisis visualization',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  solution: {
    prompt: 'Modern abstract editorial illustration showing three separate clear pathways or streams flowing harmoniously side by side, organized flowing composition with gentle curves, calming color palette with teals, warm beiges, and navy blues, minimalist flat vector design, conceptual metaphor for unbundled systems working in harmony, clean geometric shapes, soft gradients, optimistic uplifting mood, editorial illustration quality, clarity and structure visualization, professional sophisticated style',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  // The Compass section - crew matching system (NEW)
  compass: {
    prompt: 'Over-shoulder shot of person in 30s using tablet showing Kinship interface with crew profile cards and compatibility visualization on screen, sitting in comfortable modern home office, warm natural lighting, professional lifestyle photography showing user experience moment, screen clearly visible with interface elements showing values cards and compatibility maps, contemporary digital product usage, editorial tech photography style, warm inviting atmosphere, focus on intentional discovery process',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 600,
  },
  
  // Product Layers - each layer concept with mix of photos and graphics
  identity: {
    prompt: 'Artistic close-up portrait of single person in 40s, holding photo representing their personal story, warm window light from side creating dramatic but gentle shadows on face, genuine thoughtful expression, celebrating individual identity before crew formation, documentary-style lifestyle photography, intimate personal moment, authentic self-presentation not performative, shallow depth of field with soft bokeh background, editorial portrait quality, emotional depth and character visible',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  values: {
    prompt: 'Abstract illustration showing overlapping Venn diagram circles with icons representing core values, compass, heart, handshake, home, scales of justice, areas of overlap highlighted in warm gold, clean minimalist flat vector design, teal and navy color palette, conceptual representation of shared values discovery, modern infographic style, professional sophisticated aesthetic, alignment visualization, soft paper grain texture',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  biological: {
    prompt: 'Multigenerational consultation, pregnant person in 30s, young partner in 20s, and grandmother in 60s in warm meeting with medical professional at modern clinic, all engaged around table reviewing fertility and prenatal care documents, natural window lighting, inclusive three-generation healthcare moment, professional medical photography, platonic crew including extended family in biological planning, warm supportive atmosphere, contemporary clinic with warm wood and white surfaces',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  legal: {
    prompt: 'Close-up shot of three diverse hands coming together in center frame for supportive hand stack gesture over signed co-parenting agreement document on wooden table, warm natural lighting, confident moment celebrating legal protection, editorial lifestyle photography style, focus on unity and commitment, diverse crew members with mixed ages and genders visible in soft focus background, warm navy and beige office decor, intimate collaborative moment, professional yet warm atmosphere',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  support: {
    prompt: 'Medium close-up of 4 diverse adults, ages ranging from 20s to 60s, mixed genders and ethnicities, and 3 children ages 3 to 9, in comfortable circle in bright living room, all adults fully focused on children playing with blocks in center of group, no devices, warm engaged expressions showing ongoing multi-generational connection, natural daylight, documentary photography capturing authentic long-term crew with thriving happy children as focal point, adults leaning in toward children, genuine care and attention visible',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  // NEW: Layer 6 - Family Accountability
  accountability: {
    prompt: 'Abstract infographic illustration showing concentric circles or shield layers radiating outward from center representing escalating levels of family intervention, visual flow from warm protected center representing family care to outer rings representing professional and legal support, color gradient from warm teal and gold at center to cooler navy at edges, clean modern infographic design with icons at each layer showing family, therapist, school, legal symbols, minimalist flat vector style, professional serious tone, protective barrier concept, conceptual visualization of proactive family accountability preventing state intervention, sophisticated editorial illustration quality',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },

  // Supporting image for Family Accountability section
  accountabilitySupport: {
    prompt: 'Diverse crew of 3 adults, ages 30s, 40s, and 60s, sitting together in serious but supportive conversation, one adult holding hand of teenager age 15, warm living room setting, concerned but caring expressions, natural lighting, documentary photography capturing family intervention moment with multi-generational support, grandmother figure present with younger parents, genuine care and accountability visible, contemporary home setting, difficult conversation handled with dignity and teamwork',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 600,
  },
  
  // How It Works - step photos with diverse crews
  discover: {
    prompt: 'Close-up portrait of two people, diverse genders, ages, and ethnicities in 30s, meeting for first time at modern bright coffee shop, friendly introduction moment with warm genuine smiles and eye contact, sitting across from each other, comfortable casual dress, natural window lighting, professional lifestyle photography capturing initial crew discovery conversation, genuine curiosity and openness visible in expressions, platonic friendly energy not romantic, shallow depth of field focusing on faces, portrait orientation composition, intimate conversational moment',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },

  plan: {
    prompt: 'Artistic overhead shot of large table covered with planning materials, colorful sticky notes, charts, and handwritten notes, four diverse hands from different people pointing and writing, mixed skin tones and ages visible through hands, active collaborative brainstorming moment, modern home with natural daylight, editorial photography capturing organized crew collaboration, platonic team building together, portrait vertical composition, warm contemporary setting, focus on creative process and teamwork without faces, intimate planning session',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },

  secure: {
    prompt: 'Three crew members with professional advisor celebrating signed co-parenting agreement with confident handshakes and relieved smiles, modern professional office setting with large windows, confident expressions showing milestone achievement, documents visible on table, natural lighting, editorial business photography showing formalized commitment for platonic parenting team, diverse group with different ages ranging 30s to 50s, genders, and ethnicities, warm professional atmosphere, portrait orientation, contemporary office with navy and beige tones',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },

  sustain: {
    prompt: 'Intergenerational crew gathering, 5 adults with one person in 20s, two in 40s, and two in 60s to 70s, mixed genders and ethnicities, with 3 children ages 5 to 10, around outdoor dinner table at sunset, children laughing and playing between adult conversation, warm joyful multigenerational atmosphere, golden hour lighting, lifestyle photography capturing thriving chosen family with happy engaged children, platonic crew across generations raising kids together, authentic connections, portrait vertical composition, everyone participating in shared family moment',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },
  
  // Governance/Legal Support section
  governance: {
    prompt: 'Close-up intimate shot of professional mediator in 50s sitting across from diverse couple in 30s in modern bright office, warm approachable expressions during supportive consultation, natural window lighting, shallow depth of field with soft bokeh, corporate lifestyle photography showing inclusive family law practice, contemporary office with warm wood and white walls, documents on table between them, landscape composition focusing on human connection, editorial business photography quality, expertise with warmth and accessibility, genuine caring interaction',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 600,
  },

  // Testimonials - diverse crew portraits with children in some
  testimonial1: {
    prompt: 'Artistic close-up portrait of single person in mid-30s with genuine warm confident smile, sitting near window with soft natural side lighting creating beautiful shadows, neutral warm home background with deep bokeh blur, editorial lifestyle portrait photography, platonic co-parent, authentic happiness and confidence in expression, looking directly at camera with engaging eyes, square composition for circular crop, contemporary portrait style, shallow depth of field emphasizing face and emotion, intimate personal moment',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },

  testimonial2: {
    prompt: 'Group portrait of three diverse individuals, mixed ages in 30s to 40s, genders, and ethnicities, in casual triangular formation, friendly crew dynamic like band promotional photo, warm modern home interior background softly blurred, natural window lighting, genuine warm smiles showing unity and friendship, professional lifestyle photography, platonic parenting crew together, relaxed comfortable poses standing or leaning naturally, square composition for circular crop, authentic joy and camaraderie, editorial portrait quality, no romantic couples visible',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },

  testimonial3: {
    prompt: 'Close-up intimate shot of grandmother in 68 with two children ages 4 and 7 on outdoor wooden steps, children cuddled close showing secure attachment, all three faces visible with genuine smiles and laughter, warm golden hour lighting, grandmother fully focused on children with loving expression, lifestyle photography showing thriving children in multigenerational chosen family crew, other adults softly visible in blurred background, playful relaxed moment, square composition for circular crop, shallow depth of field emphasizing faces and connection',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },

  // Call to Action section - full screen background with thriving family
  cta: {
    prompt: 'Cinematic wide shot of diverse group of 5 adults, ages 25, 35, 40, 55, and 70, and 2 children ages 6 and 9, walking together on beach or open field toward sunset horizon, children running ahead playfully while adults walk in loose formation, warm golden backlight, silhouettes with rim lighting, multi-generational crew on journey together showing children thriving, epic landscape with open sky, warm golden and teal tones, professional cinematic lifestyle photography, inspiring forward movement, ultra-wide aspect for full-screen background, hopeful joyful family voyage, children clearly happy and free',
    aspectRatio: 'wide' as const,
    width: 1920,
    height: 800,
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
