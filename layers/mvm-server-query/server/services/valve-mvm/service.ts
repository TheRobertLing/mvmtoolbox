import type { ValveMVMPort } from '../../ports/valve-mvm.ts'
import { getServerLocation } from './country.ts'

export function ValveMVMService(valveMVMPort: ValveMVMPort) {
  return {
    getActiveValveMVMServers: async () => {
      const result = await valveMVMPort.getActiveValveMVMServers()
      if (result.status === 'error') return result

      return {
        ...result,
        data: result.data.map((server) => ({
          ...server,
          ...getServerLocation(server.serverName),
        })),
      }
    },
    getActiveValveMVMServerPlayers: (ip: string, port: number) =>
      valveMVMPort.getActiveValveMVMServerPlayers(ip, port),
  }
}
