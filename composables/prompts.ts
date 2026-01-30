// AI Image Generation Prompts for Kinship
// These prompts are designed to generate warm, inviting images that match the kinship brand aesthetic
// Using a consistent color palette: teal, indigo, soft whites, warm accents

export const stylePrefixes = {
  // Base style that applies to all images - enhanced with Vocalis-inspired keywords for consistency
  base: 'Modern minimalist digital illustration, soft pastel color palette with teal and indigo accents, warm and inviting atmosphere, clean composition, professional quality, tall aspect ratio poster aesthetic, soft gradients and airy negative space, precise clean lines, inclusive human-centered design, cohesive pastel palette, flat vector artistry, subtle paper grain texture, gentle diffused lighting, elegant typography accents',

  // Specific style modifiers
  warm: 'warm golden lighting, cozy atmosphere, soft shadows',
  professional: 'corporate professional style, clean lines, sophisticated color grading',
  friendly: 'friendly approachable style, soft rounded shapes, welcoming composition',
  elegant: 'elegant refined aesthetic, subtle gradients, premium feel',
  nurturing: 'nurturing caring atmosphere, gentle colors, supportive mood',
}

// Section-specific prompts for the landing page
export const sectionPrompts = {
  // Hero section - main illustration
  hero: {
    prompt: 'Intentional parenting concept, diverse group of adults collaborating around a glowing family planning board with charts and heart symbols, soft teal and indigo gradient background, connected figures showing teamwork, modern minimalist digital illustration, warm lighting, hopeful atmosphere',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 768,
  },
  
  // Problem/Solution section - fragmented vs unified
  problem: {
    prompt: 'Disorganized scattered papers and documents floating in space, confused silhouettes, disconnected elements, soft muted colors with subtle rose accents, minimalist digital illustration showing chaos and fragmentation',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  solution: {
    prompt: 'Unified organized workspace with connected documents flowing together, people collaborating harmoniously, organized grid layout, teal and emerald accent colors, clean digital illustration showing clarity and structure',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  // Product Layers - each layer concept
  identity: {
    prompt: 'Identity and self concept, abstract figure surrounded by personal symbols and cultural elements, mirror reflection showing authentic self, soft indigo and teal color palette, minimalist illustration style',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  values: {
    prompt: 'Shared values concept, two hands holding a glowing heart symbol, values icons floating around like stars, warm golden and teal color palette, minimalist digital illustration',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  biological: {
    prompt: 'Biological family planning concept, DNA helix merging with family tree, medical symbols combined with heart shapes, soft teal and lavender color palette, scientific yet warm illustration style',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  legal: {
    prompt: 'Legal agreements concept, elegant document with signatures glowing, scales of justice balanced with heart symbols, professional teal and slate color palette, sophisticated minimalist illustration',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  support: {
    prompt: 'Support network concept, interconnected circles forming a web of care, helping hands reaching toward center, warm coral and teal color palette, supportive digital illustration',
    aspectRatio: 'square' as const,
    width: 768,
    height: 768,
  },
  
  // How It Works - step illustrations
  discover: {
    prompt: 'Discovery and alignment concept, magnifying glass over diverse family figures, matching puzzle pieces coming together, bright teal and indigo colors, engaging digital illustration',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },
  
  plan: {
    prompt: 'Planning and journey concept, roadmap winding toward horizon, calendar and timeline elements, milestones marked with hearts, soft teal and amber color palette, journey-themed illustration',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },
  
  secure: {
    prompt: 'Security and agreements concept, elegant locked document with shield, legal contract with glowing seal, professional teal and slate color palette, trustworthy illustration style',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },
  
  sustain: {
    prompt: 'Sustained support concept, growing plant with strong roots, ongoing circular cycle of care, evergreen and teal color palette, nurturing long-term illustration',
    aspectRatio: 'portrait' as const,
    width: 600,
    height: 800,
  },
  
  // Governance/Legal Support section
  governance: {
    prompt: 'Governance and legal support concept, modern office with diverse legal team, documents with checkmarks, professional yet approachable, teal and slate color palette, clean illustration',
    aspectRatio: 'landscape' as const,
    width: 1024,
    height: 600,
  },
  
  // Testimonials - diverse family portraits (stylized)
  testimonial1: {
    prompt: 'Happy diverse couple portrait, warm genuine smiles, soft natural lighting, teal and warm beige background, authentic lifestyle photography style illustration, square format',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },
  
  testimonial2: {
    prompt: 'Joyful co-parenting team portrait, three adults smiling together, modern home setting, warm and inviting, soft teal accents, lifestyle illustration style',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },
  
  testimonial3: {
    prompt: 'Welcoming family portrait, two adults with child, warm embrace, golden hour lighting, soft indigo and teal background, heartwarming lifestyle illustration',
    aspectRatio: 'square' as const,
    width: 600,
    height: 600,
  },
  
  // Call to Action section
  cta: {
    prompt: 'Call to action concept, open door with bright light streaming through, welcoming path forward, step into future, inspiring teal and golden color palette, hopeful uplifting illustration',
    aspectRatio: 'wide' as const,
    width: 1200,
    height: 500,
  },
}

// Helper function to apply style prefix to any prompt
export const applyStyle = (prompt: string, style: keyof typeof stylePrefixes = 'base'): string => {
  return `${stylePrefixes[style]}, ${prompt}`
}

// Helper to get a random seed for variety
export const getRandomSeed = (): number => Math.floor(Math.random() * 1000000)

// Export default prompt sets for easy importing
export default {
  stylePrefixes,
  sectionPrompts,
  applyStyle,
  getRandomSeed,
}
