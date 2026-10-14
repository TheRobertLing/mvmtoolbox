import { z } from 'zod'

export const ServerSchema = z.object({
  ip: z.ipv4(),
  port: z.int().min(1).max(65535),
  serverName: z.string(),
  mapName: z.string(),
  playerCount: z.int().nonnegative(),
  maxPlayerCount: z.int().nonnegative(),
})

export const ListServersResponseSchema = z.array(ServerSchema)

export type Server = z.infer<typeof ServerSchema>
export type ListServersResponse = z.infer<typeof ListServersResponseSchema>
