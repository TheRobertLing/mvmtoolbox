import type { PlayerListResponse } from '#layers/server-query/shared/api/players.ts'
import { ServerAddressSchema } from '#layers/server-query/shared/api/servers.ts'
import { fetchPlayerList } from '#layers/server-query/server/steam/players.ts'

export default defineEventHandler(async (event): Promise<PlayerListResponse> => {
  const params = await getValidatedRouterParams(event, ServerAddressSchema.safeParse)
  if (!params.success) {
    setResponseStatus(event, 400)
    return { status: 'error', reason: 'invalid_request' }
  }

  const result = await fetchPlayerList(params.data)
  if (result.status === 'error') {
    setResponseStatus(event, result.reason === 'unexpected_error' ? 500 : 502)
    return result
  }
  return { ...result, timestamp: new Date().toISOString() }
})
