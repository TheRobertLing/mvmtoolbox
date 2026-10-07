export default defineNuxtConfig({
  runtimeConfig: {
    steamWebApiKey: '',
  },

  routeRules: {
    '/server-browser': { prerender: true },
  },
})
