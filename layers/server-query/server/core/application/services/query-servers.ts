import type { ServerListResult, ServerQuery } from '../ports/server-query.ts'

export type QueryServersResult =
  | (Extract<ServerListResult, { status: 'success' }> & { timestamp: string })
  | Extract<ServerListResult, { status: 'error' }>

export function QueryServers(serverQuery: ServerQuery) {
  const getServers = async (): Promise<QueryServersResult> => {
    const result = await serverQuery.getServers()
    if (result.status === 'error') return result

    return { ...result, timestamp: new Date().toISOString() }
  }

  return { getServers }
}
