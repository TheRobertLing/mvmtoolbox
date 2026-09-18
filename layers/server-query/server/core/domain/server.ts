import { z } from 'zod'

export const IPv4Schema = z.ipv4().brand<'ipv4'>()
export const PortSchema = z.int().min(1).max(65535).brand<'port'>()
export const ServerNameSchema = z.string().brand<'serverName'>()
export const MapNameSchema = z.string().brand<'mapName'>()
export const PlayerCountSchema = z.int().min(0).brand<'playerCount'>()
export const MaxPlayerCountSchema = z.int().min(0).brand<'maxPlayerCount'>()

export const ServerSchema = z.object({
  ip: IPv4Schema,
  port: PortSchema,
  serverName: ServerNameSchema,
  mapName: MapNameSchema,
  playerCount: PlayerCountSchema,
  maxPlayerCount: MaxPlayerCountSchema,
})

export type IPv4 = z.infer<typeof IPv4Schema>
export type Port = z.infer<typeof PortSchema>
export type ServerName = z.infer<typeof ServerNameSchema>
export type MapName = z.infer<typeof MapNameSchema>
export type PlayerCount = z.infer<typeof PlayerCountSchema>
export type MaxPlayerCount = z.infer<typeof MaxPlayerCountSchema>
export type Server = z.infer<typeof ServerSchema>
