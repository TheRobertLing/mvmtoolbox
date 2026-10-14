const [useProvideServerBrowser, useInjectedServerBrowser] = createInjectionState(() => {
  const servers = useServerList()
  const filters = useServerFilters(servers.list)

  return { servers, filters }
})

export { useProvideServerBrowser }

export function useServerBrowser() {
  const state = useInjectedServerBrowser()
  if (!state) throw new Error('useServerBrowser() must be used inside <ServerBrowser>')
  return state
}
