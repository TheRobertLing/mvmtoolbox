import { z } from 'zod'

export const PlayerNameSchema = z.string().brand<'playerName'>()
export const KillCountSchema = z.int().nonnegative().brand<'killCount'>()
export const ConnectionDurationSchema = z.number().nonnegative().brand<'connectionDuration'>()

export const PlayerSchema = z.object({
  playerName: PlayerNameSchema,
  killCount: KillCountSchema,
  connectionDuration: ConnectionDurationSchema,
})

export type PlayerName = z.infer<typeof PlayerNameSchema>
export type KillCount = z.infer<typeof KillCountSchema>
export type ConnectionDuration = z.infer<typeof ConnectionDurationSchema>
export type Player = z.infer<typeof PlayerSchema>
