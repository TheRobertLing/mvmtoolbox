import { z } from 'zod'

export const GetServerListResponseSchema = z.object({
  response: z.object({
    servers: z.array(
      z.object({
        // addr represents '<ip>:<port>'
        addr: z
          .string()
          .refine(
            (value) =>
              z
                .tuple([z.ipv4(), z.coerce.number().int().min(1).max(65535)])
                .safeParse(value.split(':')).success
          ),
        name: z.string(),
        map: z.string(),
        players: z.number().int().min(0).max(6),
      })
    ),
  }),
})

export const QueryByFakeIPResponseSchema = z.object({
  response: z.object({
    players_data: z.object({
      players: z
        .array(
          z.object({
            name: z.string(),
            score: z.number(),
            time_played: z.number().nonnegative(),
          })
        )
        .optional(),
    }),
  }),
})
