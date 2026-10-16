import type { PartialOptions } from 'overlayscrollbars'
import { useOverlayScrollbars } from 'overlayscrollbars-vue'

export function useThemedOverlayScrollbars(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  options: PartialOptions = {}
) {
  const colorMode = useColorMode()

  const [initialize, instance] = useOverlayScrollbars({
    defer: true,
    options: computed(() => ({
      ...options,
      update: {
        debounce: { mutation: [100, 300, true], resize: null, event: [33, 99], env: [222, 666, true] },
        ...options.update,
      },
      scrollbars: {
        theme: colorMode.value === 'dark' ? 'os-theme-light' : 'os-theme-dark',
        clickScroll: true,
        ...options.scrollbars,
      },
    })),
  })

  onMounted(() => {
    const el = toValue(target)
    if (el) initialize({ target: el })
  })

  return instance
}
