import { z } from 'zod'

export const ServerSchema = z.object({
  ip: z.ipv4(),
  port: z.number().int().min(1).max(65535),
  serverName: z.string(),
  mapName: z.string(),
  playerCount: z.number().int().min(0).max(6),
})

export const PlayerSchema = z.object({
  playerName: z.string(),
  killCount: z.number(),
  connectionDuration: z.number().nonnegative(),
})

export const ServerListResultSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: z.array(ServerSchema) }),
  z.object({ status: z.literal('error') }),
])

export const PlayerListResultSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: z.array(PlayerSchema) }),
  z.object({ status: z.literal('error') }),
])

export type ServerListResult = z.infer<typeof ServerListResultSchema>
export type PlayerListResult = z.infer<typeof PlayerListResultSchema>

export interface ServerPort {
  getServers(): Promise<ServerListResult>
  getServerPlayers(ip: string, port: number): Promise<PlayerListResult>
}
