import { z } from 'zod'
import type { Server } from '#layers/server-browser/shared/api/servers'

const ServerListEnvelopeSchema = z.object({
  response: z.object({
    servers: z.array(z.unknown()).default([]),
  }),
})

const SteamServerSchema = z
  .object({
    addr: z
      .string()
      .transform((addr) => {
        const [ip, port] = addr.split(':')
        return { ip, port }
      })
      .pipe(
        z.object({
          ip: z.ipv4(),
          port: z.coerce.number<string>().int().min(1).max(65535),
        })
      ),
    name: z.string().catch(''),
    players: z.int().min(0),
    max_players: z.int().min(0),
    map: z.string().catch(''),
  })
  .transform(({ addr, name, map, players, max_players }): Server => ({
    ip: addr.ip,
    port: addr.port,
    serverName: name,
    mapName: map,
    playerCount: players,
    maxPlayerCount: max_players,
  }))

export function parseServerList(payload: unknown): Server[] {
  const envelope = ServerListEnvelopeSchema.safeParse(payload)
  if (!envelope.success) {
    throw createError({ statusCode: 502, statusMessage: 'Bad Gateway' })
  }

  return envelope.data.response.servers.flatMap((raw) => {
    const row = SteamServerSchema.safeParse(raw)
    return row.success ? [row.data] : []
  })
}
