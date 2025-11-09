import z from 'zod';

export const createWeightEntryInputSchema = z
  .object({
    weight: z.coerce.number(),
    notes: z.string().optional(),
    date: z.coerce.date().default(new Date()),
  })
  .strict();

export type CreateWeightEntryInput = z.infer<
  typeof createWeightEntryInputSchema
>;
