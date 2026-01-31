import { fileURLToPath } from 'node:url'

const unheadCompatPath = fileURLToPath(new URL('./utils/unhead-compat.ts', import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  vite: {
    resolve: {
      alias: [{ find: /^unhead$/, replacement: unheadCompatPath }]
    }
  },
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
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'pt-BR', iso: 'pt-BR', file: 'pt-BR.json', name: 'Português (Brasil)' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en'
    }
  }
})
