import { z } from 'zod'
import type { Player } from '#layers/server-browser/shared/api/players.ts'

const PlayerListEnvelopeSchema = z.object({
  response: z.object({
    players_data: z.object({
      players: z.array(z.unknown()).default([]),
    }),
  }),
})

const SteamPlayerSchema = z
  .object({
    name: z.string(),
    score: z.int().nonnegative(),
    time_played: z.number().nonnegative(),
  })
  .transform(({ name, score, time_played }): Player => ({
    playerName: name,
    score,
    timePlayedSeconds: time_played,
  }))

export function parsePlayerList(payload: unknown): Player[] {
  const envelope = PlayerListEnvelopeSchema.safeParse(payload)
  if (!envelope.success) {
    throw createError({ statusCode: 502, statusMessage: 'Bad Gateway' })
  }

  return envelope.data.response.players_data.players.flatMap((raw) => {
    const row = SteamPlayerSchema.safeParse(raw)
    return row.success ? [row.data] : []
  })
}
