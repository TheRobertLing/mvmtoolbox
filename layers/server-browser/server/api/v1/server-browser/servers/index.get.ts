import type { ListServersResponse } from '#layers/server-browser/shared/api/servers'
import { fetchMVMServers } from '#layers/server-browser/server/steam/servers/fetch'
import { parseServerList } from '#layers/server-browser/server/steam/servers/parse'

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
    name: 'server-browser:servers',
    maxAge: 10,
    swr: false,
  }
)
