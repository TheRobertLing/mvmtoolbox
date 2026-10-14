import type { Server } from '#layers/server-browser/shared/api/servers'

export const isServerEmpty = (server: Pick<Server, 'playerCount'>) => server.playerCount === 0

export const isServerFull = (server: Pick<Server, 'playerCount' | 'maxPlayerCount'>) =>
  server.playerCount >= server.maxPlayerCount

export const serverAddress = (server: Pick<Server, 'ip' | 'port'>) => `${server.ip}:${server.port}`
