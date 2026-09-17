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

  const getServers = async (): Promise<ServerListResult> => {
    const response = await $fetch<unknown>(`${baseURL}/GetServerList/v1/`, {
      query: {
        filter: String.raw`\appid\440\empty\1\gametype\hidden,mvm,valve`,
        limit: 10000,
        key: apiKey,
      },
      timeout: 3000,
      retry: 3,
    }).catch(() => null)

    const data = GetServerListResponseSchema.safeParse(response)
    if (!data.success) {
      return { status: 'error' }
    }

    const servers = ServerSchema.array().safeParse(
      data.data.response.servers.map(({ addr, name, map, players }) => {
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

    if (!servers.success) {
      return { status: 'error' }
    }

    return { status: 'success', data: servers.data }
  }

  const getServerPlayers = async (ip: string, port: number): Promise<PlayerListResult> => {
    const fakeIP = ip.split('.').reduce((value, octet) => value * 256 + Number(octet), 0)

    const response = await $fetch<unknown>(`${baseURL}/QueryByFakeIP/v1/`, {
      query: {
        fake_ip: fakeIP,
        fake_port: port,
        app_id: 440,
        query_type: 2,
        key: apiKey,
      },
      timeout: 5000,
      retry: 0,
    }).catch(() => null)

    const data = QueryByFakeIPResponseSchema.safeParse(response)
    if (!data.success) {
      return { status: 'error' }
    }

    const players = PlayerSchema.array().safeParse(
      data.data.response.players_data.players.map((player) => ({
        playerName: player.name,
        killCount: player.score,
        connectionDuration: player.time_played,
      }))
    )

    if (!players.success) {
      return { status: 'error' }
    }

    return { status: 'success', data: players.data }
  }

  return {
    getServers,
    getServerPlayers,
  }
}
