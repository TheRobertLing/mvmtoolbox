import type { ServerListResponse } from '../../../../shared/schemas/servers.ts'
import { SteamAdaptor } from '../../../adaptors/steam/adaptor.ts'
import { ServerService } from '../../../services/server/service.ts'

export default defineCachedEventHandler(
  async (event): Promise<ServerListResponse> => {
    const { steamWebApiKey } = useRuntimeConfig(event)
    if (!steamWebApiKey) {
      setResponseStatus(event, 500)
      return { status: 'error' }
    }

    const service = ServerService(SteamAdaptor(steamWebApiKey))
    const result = await service.getServers()
    if (result.status === 'error') {
      setResponseStatus(event, 502)
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
