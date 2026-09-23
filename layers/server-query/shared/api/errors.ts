import { z } from 'zod'

export const ErrorResponseSchema = z.object({
  status: z.literal('error'),
  reason: z.enum(['upstream_failed', 'invalid_response', 'unexpected_error', 'invalid_request']),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
