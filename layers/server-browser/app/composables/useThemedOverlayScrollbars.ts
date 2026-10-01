import { useOverlayScrollbars } from 'overlayscrollbars-vue'

export function useThemedOverlayScrollbars(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>
) {
  const colorMode = useColorMode()

  const [initialize] = useOverlayScrollbars({
    defer: true,
    options: computed(() => ({
      scrollbars: {
        theme: colorMode.value === 'dark' ? 'os-theme-light' : 'os-theme-dark',
        clickScroll: true,
      },
    })),
  })

  onMounted(() => {
    const el = toValue(target)
    if (el) initialize({ target: el })
  })
}
