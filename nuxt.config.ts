export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  app: {
    baseURL: '/kinship/',
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
