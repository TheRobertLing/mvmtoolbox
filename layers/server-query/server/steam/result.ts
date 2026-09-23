import type { ErrorResponse } from '#layers/server-query/shared/api/errors.ts'

export type SteamResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; reason: Exclude<ErrorResponse['reason'], 'invalid_request'> }
