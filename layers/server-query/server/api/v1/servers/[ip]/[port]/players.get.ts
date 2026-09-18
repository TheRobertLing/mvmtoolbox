import { PlayerRequestSchema, type PlayerResponse } from '../../../../../../shared/api/players.ts'
import { SteamPlayerQuery } from '../../../../../core/adaptors/steam-player-query.ts'
import { QueryPlayers } from '../../../../../core/application/services/query-players.ts'
import { IPv4Schema, PortSchema } from '../../../../../core/domain/server.ts'

export default defineEventHandler(async (event): Promise<PlayerResponse> => {
  const params = await getValidatedRouterParams(event, PlayerRequestSchema.safeParse)
  if (!params.success) {
    setResponseStatus(event, 400)
    return { status: 'error', reason: 'invalid_request' }
  }

  const { steamWebApiKey } = useRuntimeConfig(event)
  if (!steamWebApiKey) {
    setResponseStatus(event, 500)
    return { status: 'error', reason: 'configuration_error' }
  }

  const service = QueryPlayers(SteamPlayerQuery(steamWebApiKey))
  const result = await service.getPlayers(
    IPv4Schema.parse(params.data.ip),
    PortSchema.parse(params.data.port)
  )
  if (result.status === 'error') {
    setResponseStatus(event, result.reason === 'unexpected_error' ? 500 : 502)
    return result
  }
  return result
})
