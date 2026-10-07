import { isServerEmpty, isServerFull, type Server } from '#layers/server-browser/shared/api/servers'

const [useProvideServerBrowser, useInjectedServerBrowser] = createInjectionState(() => {
  const { data, status, error, refresh } = useServers()

  const search = useState('server-browser:search', () => '')
  const hideEmpty = useState('server-browser:hide-empty', () => false)
  const hideFull = useState('server-browser:hide-full', () => false)
  const hideProfanity = useState('server-browser:hide-profanity', () => true)

  const servers = computed(() => data.value.servers)
  const fetchedAt = computed(() => data.value.fetchedAt)
  const isLoading = computed(() => status.value === 'idle' || status.value === 'pending')

  const normalizedQuery = computed(() => search.value.trim().toLowerCase())

  const visibleServers = computed(() => {
    const query = normalizedQuery.value
    return servers.value.filter(
      (server) =>
        (!hideEmpty.value || !isServerEmpty(server)) &&
        (!hideFull.value || !isServerFull(server)) &&
        (!query ||
          server.serverName.toLowerCase().includes(query) ||
          server.mapName.toLowerCase().includes(query))
    )
  })

  const serverKey = (server: Server) => `${server.ip}:${server.port}`
  const visibleKeys = computed(() => new Set(visibleServers.value.map(serverKey)))
  const isVisible = (server: Server) => visibleKeys.value.has(serverKey(server))

  return {
    servers,
    visibleServers,
    isVisible,
    fetchedAt,
    isLoading,
    error,
    refresh,
    search,
    hideEmpty,
    hideFull,
    hideProfanity,
  }
})

export { useProvideServerBrowser }

export function useServerBrowser() {
  const state = useInjectedServerBrowser()
  if (!state) throw new Error('useServerBrowser() must be used inside <ServerBrowser>')
  return state
}
