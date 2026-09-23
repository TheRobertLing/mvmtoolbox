import { z } from 'zod'
import { ErrorResponseSchema } from './errors.ts'

export const PlayerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(
      z.object({
        playerName: z.string(),
        score: z.int().nonnegative(),
        timePlayedSeconds: z.number().nonnegative(),
      })
    ),
  }),
  ErrorResponseSchema,
])

export type PlayerListResponse = z.infer<typeof PlayerListResponseSchema>
export type Player = Extract<PlayerListResponse, { status: 'success' }>['data'][number]
