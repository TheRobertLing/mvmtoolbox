import {
  ServerSchema,
  PlayerSchema,
  type ServerListResult,
  type PlayerListResult,
  type ServerPort,
} from '../../ports/server.ts'
import { GetServerListResponseSchema, QueryByFakeIPResponseSchema } from './schemas.ts'

export function SteamAdaptor(apiKey: string): ServerPort {
  const baseURL = 'https://api.steampowered.com/IGameServersService'

  const getServers = (): Promise<ServerListResult> =>
    $fetch<unknown>(`${baseURL}/GetServerList/v1/`, {
      query: {
        filter: String.raw`\appid\440\empty\1\gametype\hidden,mvm,valve`,
        limit: 10000,
        key: apiKey,
      },
      timeout: 3000,
      retry: 3,
    })
      .then(GetServerListResponseSchema.parse)
      .then(({ response }) =>
        ServerSchema.array().parse(
          response.servers.map(({ addr, name, map, players }) => {
            const [ip, port] = addr.split(':')

            return {
              ip,
              port: Number(port),
              serverName: name,
              mapName: map,
              playerCount: players,
            }
          })
        )
      )
      .then((servers) => ({ status: 'success' as const, data: servers }))
      .catch(() => ({ status: 'error' as const }))

  const getServerPlayers = (ip: string, port: number): Promise<PlayerListResult> => {
    const fakeIP = ip.split('.').reduce((value, octet) => value * 256 + Number(octet), 0)

    return $fetch<unknown>(`${baseURL}/QueryByFakeIP/v1/`, {
      query: {
        fake_ip: fakeIP,
        fake_port: port,
        app_id: 440,
        query_type: 2,
        key: apiKey,
      },
      timeout: 5000,
      retry: 0,
    })
      .then(QueryByFakeIPResponseSchema.parse)
      .then(({ response }) =>
        PlayerSchema.array().parse(
          response.players_data.players.map((player) => ({
            playerName: player.name,
            killCount: player.score,
            connectionDuration: player.time_played,
          }))
        )
      )
      .then((players) => ({ status: 'success' as const, data: players }))
      .catch(() => ({ status: 'error' as const }))
  }

  return {
    getServers,
    getServerPlayers,
  }
}
