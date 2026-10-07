import { ListServersResponseSchema, type Server } from '#layers/server-browser/shared/api/servers'

type ServerBrowserData = {
  servers: Server[]
  fetchedAt: number | null
}

// Client-only: pages using this are prerendered, so fetching on the server would bake a stale list into the HTML
export function useServers() {
  return useFetch('/api/v1/server-browser/servers', {
    key: 'server-browser:servers',
    server: false,
    lazy: true,
    dedupe: 'defer',
    retry: 0,
    transform: (response): ServerBrowserData => ({
      servers: ListServersResponseSchema.parse(response).sort((a, b) =>
        a.serverName.localeCompare(b.serverName)
      ),
      fetchedAt: Date.now(),
    }),
    default: (): ServerBrowserData => ({ servers: [], fetchedAt: null }),
  })
}
