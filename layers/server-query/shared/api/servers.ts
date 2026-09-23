import { z } from 'zod'
import { ErrorResponseSchema } from './errors.ts'

export const ServerAddressSchema = z.object({
  ip: z.ipv4(),
  port: z.coerce.number().int().min(1).max(65535),
})

export type ServerAddress = z.infer<typeof ServerAddressSchema>

export const ServerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(
      z.object({
        ip: z.ipv4(),
        port: z.int().min(1).max(65535),
        serverName: z.string(),
        mapName: z.string(),
        playerCount: z.int().min(0),
        maxPlayerCount: z.int().min(0),
      })
    ),
  }),
  ErrorResponseSchema,
])

export type ServerListResponse = z.infer<typeof ServerListResponseSchema>
export type Server = Extract<ServerListResponse, { status: 'success' }>['data'][number]
