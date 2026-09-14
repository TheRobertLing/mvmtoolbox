import { z } from 'zod'

export const ActiveValveMVMServerPlayersQuerySchema = z.object({
  ip: z.ipv4(),
  port: z.coerce.number().int().min(1).max(65535),
})

export const ActiveValveMVMServerPlayerSchema = z.object({
  playerName: z.string(),
  killCount: z.number(),
  connectionDuration: z.number().nonnegative(),
})

export const ActiveValveMVMServerPlayerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(ActiveValveMVMServerPlayerSchema),
  }),
  z.object({ status: z.literal('error') }),
])

export type ActiveValveMVMServerPlayersQuery = z.infer<typeof ActiveValveMVMServerPlayersQuerySchema>
export type ActiveValveMVMServerPlayer = z.infer<typeof ActiveValveMVMServerPlayerSchema>
export type ActiveValveMVMServerPlayerListResponse = z.infer<typeof ActiveValveMVMServerPlayerListResponseSchema>
