import { z } from 'zod'

export const ActiveValveMVMServerSchema = z.object({
  ip: z.ipv4(),
  port: z.number().int().min(1).max(65535),
  serverName: z.string(),
  mapName: z.string(),
  playerCount: z.number().int().min(0).max(6),
})

export const ActiveValveMVMServerPlayerSchema = z.object({
  playerName: z.string(),
  killCount: z.number(),
  connectionDuration: z.number().nonnegative(),
})

export const ActiveValveMVMServerListResultSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: z.array(ActiveValveMVMServerSchema) }),
  z.object({ status: z.literal('error') }),
])

export const ActiveValveMVMServerPlayerListResultSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: z.array(ActiveValveMVMServerPlayerSchema) }),
  z.object({ status: z.literal('error') }),
])

export type ActiveValveMVMServerListResult = z.infer<typeof ActiveValveMVMServerListResultSchema>
export type ActiveValveMVMServerPlayerListResult = z.infer<typeof ActiveValveMVMServerPlayerListResultSchema>

export interface ValveMVMPort {
  getActiveValveMVMServers(): Promise<ActiveValveMVMServerListResult>
  getActiveValveMVMServerPlayers(ip: string, port: number): Promise<ActiveValveMVMServerPlayerListResult>
}
