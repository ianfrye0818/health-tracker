import { Position } from '@/server/enums';
import z from 'zod';

export const updateBloodPressureInputSchema = z
  .object({
    id: z.coerce.number(),
    systolic: z.coerce.number().optional(),
    diastolic: z.coerce.number().optional(),
    pulse: z.coerce.number().nullish(),
    oxygenSaturation: z.coerce.number().nullish(),
    position: z.enum(Position).optional(),
    notes: z.string().nullish(),
    date: z.coerce.date().optional(),
  })
  .strict();

export type UpdateBloodPressureInput = z.infer<
  typeof updateBloodPressureInputSchema
>;
