import { z } from 'zod'
import type { PlayerListResponse } from '../../../../../../shared/schemas/players.ts'
import { SteamAdaptor } from '../../../../../adaptors/steam/adaptor.ts'

const paramsSchema = z.object({
  ip: z.ipv4(),
  port: z.coerce.number().int().min(1).max(65535),
})

export default defineEventHandler(async (event): Promise<PlayerListResponse> => {
  const params = await getValidatedRouterParams(event, paramsSchema.safeParse)
  if (!params.success) {
    setResponseStatus(event, 400)
    return { status: 'error' }
  }

  const { steamWebApiKey } = useRuntimeConfig(event)
  if (!steamWebApiKey) {
    setResponseStatus(event, 500)
    return { status: 'error' }
  }

  const steam = SteamAdaptor(steamWebApiKey)
  const result = await steam.getServerPlayers(params.data.ip, params.data.port)
  if (result.status === 'error') {
    setResponseStatus(event, 502)
    return result
  }
  return { ...result, timestamp: new Date().toISOString() }
})
