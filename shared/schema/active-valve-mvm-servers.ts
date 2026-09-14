import { z } from 'zod'

export const ActiveValveMVMServerSchema = z.object({
  ip: z.ipv4(),
  port: z.number().int().min(1).max(65535),
  serverName: z.string(),
  mapName: z.string(),
  playerCount: z.number().int().min(0).max(6),
})

export const ActiveValveMVMServerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(ActiveValveMVMServerSchema),
  }),
  z.object({ status: z.literal('error') }),
])

export type ActiveValveMVMServer = z.infer<typeof ActiveValveMVMServerSchema>
export type ActiveValveMVMServerListResponse = z.infer<typeof ActiveValveMVMServerListResponseSchema>
