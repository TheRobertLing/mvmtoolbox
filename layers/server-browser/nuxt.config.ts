export default defineNuxtConfig({
  extends: ['./widgets/server-browser'],

  routeRules: {
    '/server-browser': { prerender: true },
  },
})
