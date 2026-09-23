import type { ServerListResponse } from '#layers/server-query/shared/api/servers.ts'
import { fetchServerList } from '#layers/server-query/server/steam/servers.ts'

export default defineCachedEventHandler(
  async (event): Promise<ServerListResponse> => {
    const result = await fetchServerList()
    if (result.status === 'error') {
      setResponseStatus(event, result.reason === 'unexpected_error' ? 500 : 502)
      return result
    }
    return { ...result, timestamp: new Date().toISOString() }
  },
  {
    name: 'mvm-server-list',
    maxAge: 30,
    swr: false,
  }
)
