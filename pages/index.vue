<script setup lang="ts">
const { t } = useI18n()

const url = 'https://endemicmedia.github.io/kinship/'
const ogImage = 'https://endemicmedia.github.io/kinship/og-image.jpg'

useSeoMeta(() => {
  const title = t('seo.title')
  const description = t('seo.description')

  return {
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    ogImage,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary_large_image',
    twitterImage: ogImage,
    twitterSite: '@kinship',
  }
})

useHead(() => ({
  link: [
    { rel: 'canonical', href: url },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
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
        url,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/PreOrder'
        },
        audience: {
          '@type': 'Audience',
          audienceType: t('seo.audienceType')
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          ratingCount: '3',
          bestRating: '5',
          worstRating: '1'
        }
      })
    }
  ]
}))
</script>

<template>
  <main>
    <LandingHero />
    <LandingProblemSolution />
    <LandingTheCompass />
    <LandingProductLayers />
    <LandingHowItWorks />
    <LandingFamilyAccountability />
    <LandingGovernanceLegalSupport />
    <LandingTestimonials />
    <LandingCallToAction />
  </main>
</template>
