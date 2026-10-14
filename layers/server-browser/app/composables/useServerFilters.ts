import type { Server } from '#layers/server-browser/shared/api/servers'

function matchesSearch(server: Server, query: string) {
  if (!query) return true
  return (
    server.serverName.toLowerCase().includes(query) || server.mapName.toLowerCase().includes(query)
  )
}

export function useServerFilters(servers: MaybeRefOrGetter<Server[]>) {
  const hideEmpty = useState('server-browser:hide-empty', () => false)
  const hideFull = useState('server-browser:hide-full', () => false)
  const hideProfanity = useState('server-browser:hide-profanity', () => true)

  const search = useState('server-browser:search', () => '')
  const debouncedSearch = refDebounced(search, 200)

  const visibleServers = computed(() => {
    const query = debouncedSearch.value.trim().toLowerCase()
    return toValue(servers).filter(
      (server) =>
        (!hideEmpty.value || !isServerEmpty(server.playerCount)) &&
        (!hideFull.value || !isServerFull(server.playerCount, server.maxPlayerCount)) &&
        matchesSearch(server, query)
    )
  })

  const visibleKeys = computed(() => new Set(visibleServers.value.map(serverAddress)))
  const isVisible = (server: Server) => visibleKeys.value.has(serverAddress(server))

  return { search, hideEmpty, hideFull, hideProfanity, visibleServers, isVisible }
}
