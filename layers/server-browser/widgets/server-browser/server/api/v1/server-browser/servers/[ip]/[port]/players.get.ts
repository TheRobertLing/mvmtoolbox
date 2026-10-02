import {
  ListServerPlayersParamsSchema,
  type ListServerPlayersResponse,
} from '#widgets/server-browser/shared/api/players.ts'
import { fetchServerPlayers } from '#widgets/server-browser/server/core/players/fetch.ts'
import { parsePlayerList } from '#widgets/server-browser/server/core/players/parse.ts'

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
