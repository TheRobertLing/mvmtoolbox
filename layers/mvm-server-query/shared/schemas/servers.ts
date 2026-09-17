import { z } from 'zod'

export const ServerSchema = z.object({
  ip: z.ipv4(),
  port: z.number().int().min(1).max(65535),
  serverName: z.string(),
  mapName: z.string(),
  playerCount: z.number().int().min(0).max(6),
})

export const ServerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(ServerSchema),
  }),
  z.object({ status: z.literal('error') }),
])

export type Server = z.infer<typeof ServerSchema>
export type ServerListResponse = z.infer<typeof ServerListResponseSchema>
