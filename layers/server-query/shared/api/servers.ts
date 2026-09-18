import { z } from 'zod'
import { ErrorResponseSchema } from './errors.ts'

export const ServerResponseSchema = z.discriminatedUnion('status', [
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

export type ServerResponse = z.infer<typeof ServerResponseSchema>
export type Server = Extract<ServerResponse, { status: 'success' }>['data'][number]
