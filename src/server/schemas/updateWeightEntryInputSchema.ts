import z from 'zod';

export const updateWeightEntryInputSchema = z
  .object({
    id: z.coerce.number(),
    weight: z.coerce.number().optional(),
    notes: z.string().nullish(),
    date: z.coerce.date().optional(),
  })
  .strict();

export type UpdateWeightEntryInput = z.infer<
  typeof updateWeightEntryInputSchema
>;
