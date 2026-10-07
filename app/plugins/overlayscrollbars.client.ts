import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars'

export default defineNuxtPlugin(() => {
  OverlayScrollbars.plugin(ClickScrollPlugin)
})
