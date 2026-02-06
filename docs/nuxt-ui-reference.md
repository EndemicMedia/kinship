# The Intuitive Vue UI Library - Nuxt UI Documentation

A comprehensive Vue UI component library (Nuxt optional) with 125+ accessible, Tailwind CSS components for building modern web applications. Works with Nuxt and plain Vue apps (Vite, Inertia, SSR).

## Quick Links
- [Docs](/docs)
- [Figma](/figma)
- [Templates](/templates)
- [Showcase](/showcase)
- [Community](/community)
- [Blog](/blog)
- [Releases](/releases)

## Installation
[Get started with Nuxt](/docs/getting-started/installation/nuxt)
[Get started with Vue](/docs/getting-started/installation/vue)
[Explore components](/docs/components)

## Key Features

### Styled with Tailwind CSS
Beautifully styled by default, overwrite any style you want.

### Accessible with Reka UI
Robust accessibility out of the box.

### Type-safe with TypeScript
Auto-complete and type safety for all components.

## Components

### Layout Components
- Accordion
- Alert
- App
- AuthForm
- Avatar
- AvatarGroup
- Badge
- Banner
- BlogPost
- BlogPosts
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- ChangelogVersion
- ChangelogVersions
- ChatMessage
- ChatMessages
- ChatPalette

### Navigation
- CommandPalette
- ContextMenu
- DropdownMenu
- Link
- Modal
- NavigationMenu
- Pagination
- Popover
- Sheet
- Sidebar
- Table
- Tabs
- Tooltip

### Form Components
- Checkbox
- Form
- FormField
- Input
- InputMenu
- NumberInput
- PinInput
- RadioGroup
- Select
- SelectMenu
- Slider
- Switch
- Textarea
- RadioGroup

### Data Display
- Calendar
- Collapsible
- CommandPalette
- DataTable
- Kbd
- Meter
- Progress
- ScrollArea
- Separator
- Skeleton
- Table
- Tree

### Overlays
- AlertDialog
- ContextMenu
- Dialog
- Drawer
- DropdownMenu
- HoverCard
- Modal
- Popover
- Sheet
- Tooltip

## Design System

### CSS-first configuration
Define fonts, colors, and breakpoints with the @theme directive directly in your CSS. This makes your theme portable, maintainable and easy to customize.

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: 'Public Sans', system-ui, sans-serif;
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-200: #bae6fd;
  --color-brand-300: #7dd3fc;
  --color-brand-400: #38bdf8;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;
  --color-brand-800: #1e40af;
  --color-brand-900: #1e3a8a;
  --color-brand-950: #172554;
}
```

### App Config
```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      secondary: 'purple',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'zinc'
    },
    icons: {
      loading: 'i-lucide-loader-circle',
      search: 'i-lucide-search',
      menu: 'i-lucide-menu'
    }
  }
})
```

### Semantic color system
Configure 7 semantic color aliases (primary, secondary, success, info, warning, error, neutral) that describe the purpose of colors rather than specific values.

### Consistent design tokens
Use CSS variables as design tokens for consistent theming with semantic utility classes that automatically adapt to light and dark modes.

- **Semantic color utilities**: Use utility classes like text-primary, bg-success, or border-error that automatically adapt to light and dark modes via CSS variables.
- **Text and background tokens**: Complete set of utility classes for text (text-dimmed, text-muted, text-highlighted), backgrounds (bg-default, bg-elevated, bg-accented) and borders.
- **Global layout variables**: Customize global styles with --ui-radius for border rounding, --ui-container for layout widths, and --ui-header-height for consistent spacing.

### Customizing CSS Variables

```css
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  --ui-primary: black;
  --ui-radius: 0.5rem;
  --ui-container: var(--container-5xl);
  --ui-header-height: --spacing(24);
}

.dark {
  --ui-primary: white;
  --ui-bg: var(--ui-color-neutral-950);
}
```

### Component Usage
```vue
<template>
  <div class="bg-default border border-default rounded-lg p-4">
    <span class="text-primary">Primary text</span>
    <span class="text-dimmed">Dimmed text</span>
    <div class="bg-elevated p-3 rounded-md mt-2">
      <span class="text-muted">Elevated background</span>
    </div>
  </div>
</template>
```

## Tailwind Variants API

Components use slots for flexible styling, variants for prop-based styles, and compound variants for complex conditional styling with intelligent class merging.

### Global theme configuration
Override component themes globally in app.config.ts using slots, variants, compound variants, and default variants for consistent styling across your application.

### Per-component customization
Fine-tune individual components with the ui prop for slot-specific styling and class prop for root element overrides, providing maximum flexibility.

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'font-bold'
      },
      variants: {
        size: {
          md: {
            base: 'px-4 py-2 text-sm'
          }
        }
      },
      defaultVariants: {
        color: 'neutral'
      }
    }
  }
})
```

```vue
<!-- Button.vue -->
<template>
  <UButton
    label="Button"
    size="md"
    variant="outline"
    trailing-icon="i-lucide-chevron-right"
    :ui="{
      trailingIcon: 'rotate-90'
    }"
    class="rounded-full"
  />
</template>
```

## Integrations

### Large icons sets
Access to over 200,000 customizable icons from Iconify powered by @nuxt/icon.

### Easy font customization
Performance-optimized fonts with first-class @nuxt/fonts integration.

### Light & dark mode
Dark mode-ready components with @nuxtjs/color-mode module integration.

### Internationalization (i18n)
Translated into 50+ languages, works well with i18n and multi-directional support (LTR/RTL).

### Beautiful typography
Integrates with @nuxt/content to deliver beautiful typography and consistent component styling.

## Available Templates

1. **Editor** - https://editor-template.nuxt.dev
2. **Changelog** - https://changelog-template.nuxt.dev
3. **Portfolio** - https://portfolio-template.nuxt.dev
4. **Chat** - https://chat-template.nuxt.dev
5. **Dashboard** - https://dashboard-template.nuxt.dev
6. **SaaS** - https://saas-template.nuxt.dev
7. **Landing** - https://landing-template.nuxt.dev
8. **Docs** - https://docs-template.nuxt.dev
9. **Starter** - https://starter-template.nuxt.dev

All templates are:
- Production-ready templates built with best practices
- SEO optimized, performance tuned
- Available for both Nuxt and Vue applications
- Fully customizable with complete source code access

## Stats
- 729K+ monthly downloads
- 6.2K+ GitHub stars
- 300+ Contributors

Published under MIT License
https://github.com/nuxt/ui
