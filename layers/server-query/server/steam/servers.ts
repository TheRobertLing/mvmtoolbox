import { z } from 'zod'
import type { Server } from '#layers/server-query/shared/api/servers.ts'
import type { SteamResult } from './result.ts'

const GetServerListResponseSchema = z.object({
  response: z.object({
    servers: z.array(
      z.object({
        addr: z
          .string()
          .transform((value) => value.split(':'))
          .pipe(z.tuple([z.ipv4(), z.coerce.number<string>().int().min(1).max(65535)])),
        name: z.string(),
        players: z.number().int().min(0),
        max_players: z.number().int().min(0),
        map: z.string(),
      })
    ),
  }),
})

export async function fetchServerList(): Promise<SteamResult<Server[]>> {
  const payload = await $fetch<unknown>(
    'https://api.steampowered.com/IGameServersService/GetServerList/v1/',
    {
      query: {
        filter: String.raw`\appid\440\empty\1\gametype\hidden,mvm,valve`,
        limit: 10000,
        key: useRuntimeConfig().steamWebApiKey,
      },
      timeout: 3000,
      retry: 3,
      ignoreResponseError: true,
    }
  ).catch(() => null)
  if (payload === null) return { status: 'error', reason: 'upstream_failed' }

  const parsed = GetServerListResponseSchema.safeParse(payload)
  if (!parsed.success) return { status: 'error', reason: 'invalid_response' }

  return {
    status: 'success',
    data: parsed.data.response.servers.map(
      ({ addr: [ip, port], name, map, players, max_players }) => ({
        ip,
        port,
        serverName: name,
        mapName: map,
        playerCount: players,
        maxPlayerCount: max_players,
      })
    ),
  }
}
