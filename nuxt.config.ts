// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxthub/core', '@vueuse/nuxt'],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  css: ['overlayscrollbars/overlayscrollbars.css', '~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  hub: {
    cache: true,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
