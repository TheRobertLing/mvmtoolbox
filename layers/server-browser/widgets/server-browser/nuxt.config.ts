import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  // nested layers don't get an auto-generated #layers/* alias, so name it ourselves
  alias: {
    '#widgets/server-browser': fileURLToPath(new URL('./', import.meta.url)),
  },

  runtimeConfig: {
    steamWebApiKey: '',
  },
})
