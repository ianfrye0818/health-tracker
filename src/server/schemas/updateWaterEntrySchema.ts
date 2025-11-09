import z from 'zod';
import { MeasureUnit } from '../enums';

export const updateWaterEntryInputSchema = z
  .object({
    id: z.coerce.number(),
    amount: z.coerce.number().optional(),
    unit: z.enum(MeasureUnit).optional(),
    date: z.coerce.date().optional(),
  })
  .strict();

export type UpdateWaterEntryInput = z.infer<typeof updateWaterEntryInputSchema>;
