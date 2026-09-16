import type { ServerPort } from '../../ports/server.ts'
import { getServerLocation } from './location.ts'

export function ServerService(serverPort: ServerPort) {
  return {
    getServers: async () => {
      const result = await serverPort.getServers()
      if (result.status === 'error') return result

      return {
        ...result,
        data: result.data.map((server) => ({
          ...server,
          ...getServerLocation(server.serverName),
        })),
      }
    },
    getServerPlayers: (ip: string, port: number) =>
      serverPort.getServerPlayers(ip, port),
  }
}
