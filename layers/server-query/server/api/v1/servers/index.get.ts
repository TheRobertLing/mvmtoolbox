import type { ListServersResponse } from '#layers/server-query/shared/api/servers.ts'
import { fetchMVMServers } from '#layers/server-query/server/core/servers/fetch.ts'
import { parseServerList } from '#layers/server-query/server/core/servers/parse.ts'

export default defineCachedEventHandler(
  async (event): Promise<ListServersResponse> => {
    // Get API Key
    const { steamWebApiKey } = useRuntimeConfig(event)

    // Fetch data
    const payload = await fetchMVMServers(steamWebApiKey)

    // Return data
    return parseServerList(payload)
  },
  {
    name: 'servers',
    maxAge: 10,
    swr: true,
  }
)
