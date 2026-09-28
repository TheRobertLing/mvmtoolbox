import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars'

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useColorMode()

  nuxtApp.hook('app:mounted', () => {
    OverlayScrollbars.plugin(ClickScrollPlugin)

    const scrollbar = OverlayScrollbars(document.body, {
      scrollbars: {
        clickScroll: true,
      },
    })

    watch(
      () => colorMode.value,
      (mode) => {
        scrollbar.options({
          scrollbars: { theme: mode === 'dark' ? 'os-theme-light' : 'os-theme-dark' },
        })
      },
      { immediate: true }
    )
  })
})
