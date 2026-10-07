import {
  ListServerPlayersParamsSchema,
  type ListServerPlayersResponse,
} from '#layers/server-browser/shared/api/players'
import { fetchServerPlayers } from '#layers/server-browser/server/core/players/fetch'
import { parsePlayerList } from '#layers/server-browser/server/core/players/parse'

export default defineCachedEventHandler(
  async (event): Promise<ListServerPlayersResponse> => {
    // Parse request
    const { ip, port } = await getValidatedRouterParams(event, ListServerPlayersParamsSchema.parse)

    // Get API key
    const { steamWebApiKey } = useRuntimeConfig(event)

    // Fetch data
    const payload = await fetchServerPlayers(steamWebApiKey, ip, port)

    // Return data
    return parsePlayerList(payload)
  },
  {
    name: 'players',
    maxAge: 10,
    swr: false,
  }
)
