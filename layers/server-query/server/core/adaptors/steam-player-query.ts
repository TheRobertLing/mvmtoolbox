import { z } from 'zod'
import type { PlayerListResult, PlayerQuery } from '../application/ports/player-query.ts'
import { PlayerSchema } from '../domain/player.ts'
import type { IPv4, Port } from '../domain/server.ts'

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

export function SteamPlayerQuery(apiKey: string): PlayerQuery {
  const getPlayers = async (ip: IPv4, port: Port): Promise<PlayerListResult> => {
    const fakeIP = ip.split('.').reduce((value, octet) => value * 256 + Number(octet), 0)
    let payload: unknown

    try {
      payload = await $fetch<unknown>(
        'https://api.steampowered.com/IGameServersService/QueryByFakeIP/v1/',
        {
          query: {
            fake_ip: fakeIP,
            fake_port: port,
            app_id: 440,
            query_type: 2,
            key: apiKey,
          },
          timeout: 5000,
          retry: 0,
        }
      )
    } catch {
      return { status: 'error', reason: 'request_failed' }
    }

    try {
      const { response } = QueryByFakeIPResponseSchema.parse(payload)
      const players = PlayerSchema.array().parse(
        response.players_data.players.map((player) => ({
          playerName: player.name,
          killCount: player.score,
          connectionDuration: player.time_played,
        }))
      )

      return { status: 'success', data: players }
    } catch (error) {
      return {
        status: 'error',
        reason: error instanceof z.ZodError ? 'invalid_response' : 'unexpected_error',
      }
    }
  }

  return { getPlayers }
}
