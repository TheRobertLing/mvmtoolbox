import type { ValveMVMPort } from '../../ports/valve-mvm.ts'

export function ValveMVMService(valveMVMPort: ValveMVMPort) {
  return {
    getActiveValveMVMServers: () => valveMVMPort.getActiveValveMVMServers(),
    getActiveValveMVMServerPlayers: (ip: string, port: number) =>
      valveMVMPort.getActiveValveMVMServerPlayers(ip, port),
  }
}
