import { z } from 'zod'
import type { ServerListResult, ServerQuery } from '../application/ports/server-query.ts'
import { ServerSchema } from '../domain/server.ts'

export const SteamServerSchema = z.object({
  addr: z
    .string()
    .refine(
      (value) =>
        z.tuple([z.ipv4(), z.coerce.number().int().min(1).max(65535)]).safeParse(value.split(':'))
          .success
    ),
  name: z.string(),
  players: z.number().int().min(0),
  max_players: z.number().int().min(0),
  map: z.string(),
})

export type SteamServer = z.infer<typeof SteamServerSchema>

const GetServerListResponseSchema = z.object({
  response: z.object({
    servers: z.array(SteamServerSchema),
  }),
})

export function SteamServerQuery(apiKey: string): ServerQuery {
  const getServers = async (): Promise<ServerListResult> => {
    let payload: unknown

    try {
      payload = await $fetch<unknown>(
        'https://api.steampowered.com/IGameServersService/GetServerList/v1/',
        {
          query: {
            filter: String.raw`\appid\440\empty\1\gametype\hidden,mvm,valve`,
            limit: 10000,
            key: apiKey,
          },
          timeout: 3000,
          retry: 3,
        }
      )
    } catch {
      return { status: 'error', reason: 'request_failed' }
    }

    try {
      const { response } = GetServerListResponseSchema.parse(payload)
      const servers = ServerSchema.array().parse(
        response.servers.map(({ addr, name, map, players, max_players }) => {
          const [ip, port] = addr.split(':')

          return {
            ip,
            port: Number(port),
            serverName: name,
            mapName: map,
            playerCount: players,
            maxPlayerCount: max_players,
          }
        })
      )

      return { status: 'success', data: servers }
    } catch (error) {
      return {
        status: 'error',
        reason: error instanceof z.ZodError ? 'invalid_response' : 'unexpected_error',
      }
    }
  }

  return { getServers }
}
