import type { Server } from '../../domain/server.ts'
import type { QueryFailureReason } from './query-failure.ts'

export type ServerListResult =
  | { status: 'success'; data: Server[] }
  | { status: 'error'; reason: QueryFailureReason }

export interface ServerQuery {
  getServers(): Promise<ServerListResult>
}
