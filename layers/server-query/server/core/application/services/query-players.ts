import type { IPv4, Port } from '../../domain/server.ts'
import type { PlayerListResult, PlayerQuery } from '../ports/player-query.ts'

export type QueryPlayersResult =
  | (Extract<PlayerListResult, { status: 'success' }> & { timestamp: string })
  | Extract<PlayerListResult, { status: 'error' }>

export function QueryPlayers(playerQuery: PlayerQuery) {
  const getPlayers = async (ip: IPv4, port: Port): Promise<QueryPlayersResult> => {
    const result = await playerQuery.getPlayers(ip, port)
    if (result.status === 'error') return result

    return { ...result, timestamp: new Date().toISOString() }
  }

  return { getPlayers }
}
