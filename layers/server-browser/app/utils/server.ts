import type { Server } from '#layers/server-browser/shared/api/servers'

export const isServerEmpty = (playerCount: number) => playerCount === 0

export const isServerFull = (playerCount: number, maxPlayerCount: number) =>
  playerCount >= maxPlayerCount

export const serverAddress = (server: Pick<Server, 'ip' | 'port'>) => `${server.ip}:${server.port}`
