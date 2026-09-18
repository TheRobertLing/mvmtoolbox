import { z } from 'zod'

export const ErrorResponseSchema = z.object({
  status: z.literal('error'),
  reason: z.enum([
    'request_failed',
    'invalid_response',
    'unexpected_error',
    'invalid_request',
    'configuration_error',
  ]),
})
