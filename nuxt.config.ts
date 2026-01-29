export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  ui: {
    icons: ['heroicons']
  }
})
