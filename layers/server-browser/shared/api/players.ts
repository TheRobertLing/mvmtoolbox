import { z } from 'zod'

export const PlayerSchema = z.object({
  playerName: z.string(),
  score: z.int().nonnegative(),
  timePlayedSeconds: z.number().nonnegative(),
})

export const ListServerPlayersParamsSchema = z.object({
  ip: z.ipv4(),
  port: z.coerce.number<string>().int().min(1).max(65535),
})

export const ListServerPlayersResponseSchema = z.array(PlayerSchema)

export type Player = z.infer<typeof PlayerSchema>
export type ListServerPlayersParams = z.infer<typeof ListServerPlayersParamsSchema>
export type ListServerPlayersResponse = z.infer<typeof ListServerPlayersResponseSchema>
