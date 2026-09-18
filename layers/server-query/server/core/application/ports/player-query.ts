import type { Player } from '../../domain/player.ts'
import type { IPv4, Port } from '../../domain/server.ts'
import type { QueryFailureReason } from './query-failure.ts'

export type PlayerListResult =
  | { status: 'success'; data: Player[] }
  | { status: 'error'; reason: QueryFailureReason }

export interface PlayerQuery {
  getPlayers(ip: IPv4, port: Port): Promise<PlayerListResult>
}
