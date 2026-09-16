import {
  ActiveValveMVMServerSchema,
  ActiveValveMVMServerPlayerSchema,
  type ActiveValveMVMServerListResult,
  type ActiveValveMVMServerPlayerListResult,
  type ValveMVMPort,
} from '../../ports/valve-mvm.ts'
import { GetServerListResponseSchema, QueryByFakeIPResponseSchema } from './schemas.ts'

export function ValveMVMAdaptor(apiKey: string): ValveMVMPort {
  const baseURL = 'https://api.steampowered.com/IGameServersService'

  return {
    getActiveValveMVMServers: async (): Promise<ActiveValveMVMServerListResult> => {
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

      const servers = ActiveValveMVMServerSchema.array().safeParse(
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
    },

    getActiveValveMVMServerPlayers: async (
      ip: string,
      port: number
    ): Promise<ActiveValveMVMServerPlayerListResult> => {
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

      const players = ActiveValveMVMServerPlayerSchema.array().safeParse(
        (data.data.response.players_data.players ?? []).map((player) => ({
          playerName: player.name,
          killCount: player.score,
          connectionDuration: player.time_played,
        }))
      )
      if (!players.success) {
        return { status: 'error' }
      }

      return { status: 'success', data: players.data }
    },
  }
}
