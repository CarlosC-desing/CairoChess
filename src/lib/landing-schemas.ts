import { z } from 'zod';

export const lichessDailyPuzzleSchema = z.object({
  puzzle: z.object({
    id: z.string(),
    rating: z.number(),
    plays: z.number(),
    solution: z.array(z.string()),
    fen: z.string(),
    themes: z.array(z.string()),
  }),
});

export type LichessDailyPuzzle = z.infer<typeof lichessDailyPuzzleSchema>;
