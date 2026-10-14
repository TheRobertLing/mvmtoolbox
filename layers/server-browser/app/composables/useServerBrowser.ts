const [useProvideServerBrowser, useInjectedServerBrowser] = createInjectionState(() => {
  const servers = reactive(useServerList())
  const filters = reactive(useServerFilters(() => servers.list))

  return { servers, filters }
})

export { useProvideServerBrowser }

export function useServerBrowser() {
  const state = useInjectedServerBrowser()
  if (!state) throw new Error('useServerBrowser() must be used inside <ServerBrowser>')
  return state
}
