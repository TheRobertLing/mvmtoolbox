import type { ServerPort } from '../../ports/server.ts'

export function ServerService(serverPort: ServerPort) {
  const getServers = () => serverPort.getServers()

  const getServerPlayers = (ip: string, port: number) => serverPort.getServerPlayers(ip, port)

  return {
    getServers,
    getServerPlayers,
  }
}
