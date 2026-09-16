import { z } from 'zod'

export const ServerAddressSchema = z.object({
  ip: z.ipv4(),
  port: z.coerce.number().int().min(1).max(65535),
})

export const PlayerSchema = z.object({
  playerName: z.string(),
  killCount: z.number(),
  connectionDuration: z.number().nonnegative(),
})

export const PlayerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(PlayerSchema),
  }),
  z.object({ status: z.literal('error') }),
])

export type ServerAddress = z.infer<typeof ServerAddressSchema>
export type Player = z.infer<typeof PlayerSchema>
export type PlayerListResponse = z.infer<typeof PlayerListResponseSchema>
