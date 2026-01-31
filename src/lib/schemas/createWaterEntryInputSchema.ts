import z from 'zod';
import { MeasureUnit } from '../../lib/enums';

export const createWaterEntryInputSchema = z
  .object({
    amount: z.coerce.number(),
    unit: z.enum(MeasureUnit).default(MeasureUnit.OUNCES),
    date: z.coerce.date().default(new Date()),
  })
  .strict();

export type CreateWaterEntryInput = z.infer<typeof createWaterEntryInputSchema>;
