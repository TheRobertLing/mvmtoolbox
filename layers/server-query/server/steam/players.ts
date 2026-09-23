import { z } from 'zod'
import type { Player } from '#layers/server-query/shared/api/players.ts'
import type { ServerAddress } from '#layers/server-query/shared/api/servers.ts'
import type { SteamResult } from './result.ts'

const QueryByFakeIPResponseSchema = z.object({
  response: z.object({
    players_data: z.object({
      players: z
        .array(
          z.object({
            name: z.string(),
            score: z.int().nonnegative(),
            time_played: z.number().nonnegative(),
          })
        )
        .default([]),
    }),
  }),
})

function ipv4ToFakeIP(ip: string): number {
  return ip.split('.').reduce((value, octet) => value * 256 + Number(octet), 0)
}

export async function fetchPlayerList({ ip, port }: ServerAddress): Promise<SteamResult<Player[]>> {
  const payload = await $fetch<unknown>(
    'https://api.steampowered.com/IGameServersService/QueryByFakeIP/v1/',
    {
      query: {
        fake_ip: ipv4ToFakeIP(ip),
        fake_port: port,
        app_id: 440,
        query_type: 2,
        key: useRuntimeConfig().steamWebApiKey,
      },
      timeout: 5000,
      retry: 0,
      ignoreResponseError: true,
    }
  ).catch(() => null)
  if (payload === null) return { status: 'error', reason: 'upstream_failed' }

  const parsed = QueryByFakeIPResponseSchema.safeParse(payload)
  if (!parsed.success) return { status: 'error', reason: 'invalid_response' }

  return {
    status: 'success',
    data: parsed.data.response.players_data.players.map((player) => ({
      playerName: player.name,
      score: player.score,
      timePlayedSeconds: player.time_played,
    })),
  }
}
