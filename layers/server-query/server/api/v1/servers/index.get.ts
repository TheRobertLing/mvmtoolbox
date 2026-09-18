import type { ServerResponse } from '../../../../shared/api/servers.ts'
import { SteamServerQuery } from '../../../core/adaptors/steam-server-query.ts'
import { QueryServers } from '../../../core/application/services/query-servers.ts'

export default defineCachedEventHandler(
  async (event): Promise<ServerResponse> => {
    const { steamWebApiKey } = useRuntimeConfig(event)
    if (!steamWebApiKey) {
      setResponseStatus(event, 500)
      return { status: 'error', reason: 'configuration_error' }
    }

    const service = QueryServers(SteamServerQuery(steamWebApiKey))
    const result = await service.getServers()
    if (result.status === 'error') {
      setResponseStatus(event, result.reason === 'unexpected_error' ? 500 : 502)
      return result
    }
    return result
  },
  {
    name: 'mvm-server-list',
    maxAge: 30,
    swr: false,
  }
)
