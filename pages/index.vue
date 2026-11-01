<script setup lang="ts">
import { withBase } from 'ufo'
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const baseURL = useRuntimeConfig().app.baseURL

const origin = 'https://endemicmedia.github.io'
const localizedUrl = (code: string) => new URL(withBase(localePath('/', code), baseURL), origin).href
const url = computed(() => localizedUrl(locale.value))
const ogImage = new URL(withBase('/og-image.jpg', baseURL), origin).href

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogUrl: () => url.value,
  ogImage,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
})

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'canonical', href: url.value },
    ...locales.value.map(item => ({
      rel: 'alternate',
      hreflang: typeof item === 'string' ? item : item.language || item.code,
      href: localizedUrl(typeof item === 'string' ? item : item.code)
    })),
    { rel: 'alternate', hreflang: 'x-default', href: localizedUrl('en') },
    { rel: 'icon', type: 'image/x-icon', href: withBase('/favicon.ico', baseURL) },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: withBase('/favicon-32x32.png', baseURL) },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: withBase('/favicon-16x16.png', baseURL) },
    { rel: 'apple-touch-icon', sizes: '180x180', href: withBase('/apple-touch-icon.png', baseURL) }
  ],
  meta: [
    { name: 'theme-color', content: '#0d9488' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: t('brand.name'),
        applicationCategory: 'LifestyleApplication',
        description: t('seo.description'),
        url: url.value,
        audience: {
          '@type': 'Audience',
          audienceType: t('seo.audienceType')
        }
      })
    }
  ]
}))
</script>

<template>
  <div>
    <LandingHero />
    <LandingProblemSolution />
    <LandingHowItWorks />
    <LandingFeatures />
    <LandingTestimonials />
    <LandingCallToAction />
  </div>
</template>
