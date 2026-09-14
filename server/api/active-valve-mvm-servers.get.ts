import type { ActiveValveMVMServerListResponse } from '../../shared/schema/active-valve-mvm-servers.ts'
import { ValveMVMAdaptor } from '../adaptors/valve-mvm/adaptor.ts'
import { ValveMVMService } from '../services/valve-mvm/service.ts'

export default defineCachedEventHandler(
  async (event): Promise<ActiveValveMVMServerListResponse> => {
    const { steamWebApiKey } = useRuntimeConfig(event)
    if (!steamWebApiKey) {
      setResponseStatus(event, 500)
      return { status: 'error' }
    }

    const service = ValveMVMService(ValveMVMAdaptor(steamWebApiKey))
    const result = await service.getActiveValveMVMServers()
    if (result.status === 'error') {
      setResponseStatus(event, 502)
      return result
    }
    return { ...result, timestamp: new Date().toISOString() }
  },
  {
    name: 'mvm-server-list',
    maxAge: 30,
    swr: false,
  }
)
