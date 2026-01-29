<script setup lang="ts">
const title = 'Kinship | Intentional Parenthood Coordination Platform'
const description =
  'Kinship is a modern, beautiful platform for forming intentional parenting teams—aligning identity, values, biological planning, legal agreements, and long-term support.'
const url = 'https://kinship.com'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: url,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Kinship',
        applicationCategory: 'LifestyleApplication',
        description,
        url,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/PreOrder'
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'Intentional parents and co-parenting teams'
        }
      })
    }
  ]
})
</script>

<template>
  <main>
    <LandingHero />
    <LandingProblemSolution />
    <LandingProductLayers />
    <LandingHowItWorks />
    <LandingGovernanceLegalSupport />
    <LandingTestimonials />
    <LandingCallToAction />
  </main>
</template>
