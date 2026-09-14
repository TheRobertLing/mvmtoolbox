import { ActiveValveMVMServerPlayersQuerySchema, type ActiveValveMVMServerPlayerListResponse } from '../../shared/schema/active-valve-mvm-server-players.ts'
import { ValveMVMAdaptor } from '../adaptors/valve-mvm/adaptor.ts'
import { ValveMVMService } from '../services/valve-mvm/service.ts'

export default defineEventHandler(async (event): Promise<ActiveValveMVMServerPlayerListResponse> => {
  const query = ActiveValveMVMServerPlayersQuerySchema.safeParse(getQuery(event))
  if (!query.success) {
    setResponseStatus(event, 400)
    return { status: 'error' }
  }

  const { steamWebApiKey } = useRuntimeConfig(event)
  if (!steamWebApiKey) {
    setResponseStatus(event, 500)
    return { status: 'error' }
  }

  const service = ValveMVMService(ValveMVMAdaptor(steamWebApiKey))
  const result = await service.getActiveValveMVMServerPlayers(query.data.ip, query.data.port)
  if (result.status === 'error') {
    setResponseStatus(event, 502)
    return result
  }
  return { ...result, timestamp: new Date().toISOString() }
})
