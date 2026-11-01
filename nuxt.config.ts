import { fileURLToPath } from 'node:url'

const unheadCompatPath = fileURLToPath(new URL('./utils/unhead-compat.ts', import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'],
  devtools: { enabled: process.env.E2E_TEST !== '1' },
  // Mock account state lives in the browser; app routes must not render a different SSR session.
  routeRules: {
    '/app': { ssr: false },
    '/app/**': { ssr: false },
    '/de/app': { ssr: false },
    '/de/app/**': { ssr: false },
    '/pt-BR/app': { ssr: false },
    '/pt-BR/app/**': { ssr: false }
  },
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
  icon: {
    serverBundle: {
      collections: ['heroicons']
    }
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'pt-BR', language: 'pt-BR', file: 'pt-BR.json', name: 'Português (Brasil)' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en'
    }
  },
  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: false,
      routes: ['/', '/de', '/pt-BR'],
      ignore: [
        '/app',
        '/app/**',
        '/de/app',
        '/de/app/**',
        '/pt-BR/app',
        '/pt-BR/app/**'
      ]
    }
  }
})
